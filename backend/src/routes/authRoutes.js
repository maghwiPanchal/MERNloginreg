import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

// Password validation rule
const passwordRule = body("password")
  .isLength({ min: 8 })
  .matches(/[A-Z]/).withMessage("Must contain an uppercase letter")
  .matches(/[a-z]/).withMessage("Must contain a lowercase letter")
  .matches(/\d/).withMessage("Must contain a number")
  .matches(/[@$!%*?&]/).withMessage("Must contain a special character");

// Email rule
const emailRule = body("email").isEmail().withMessage("Invalid email");

// Username rule
const usernameRule = body("username").notEmpty().withMessage("Username required");


const router = express.Router();

// Define a POST route for user registration
router.post("/register", [usernameRule, emailRule, passwordRule], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  // Destructure username, email, and password from the request body
  let { username, email, password } = req.body;
  email = email.toLowerCase();

  try {
    // Check if any of the required fields are missing
    if (!username || !email || !password) {
      // If any field is missing, send a 400 Bad Request response with a message
      return res.status(400).json({ message: "Please fill all the fields." });
    }

    // Check if a user with the given email already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      // If user exists, send a 400 Bad Request response indicating duplication
      return res.status(400).json({ message: "Email address already exists" });
    }

    // Create a new user document in the database with the provided details
    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    // Respond with the newly created user's id, username, email, and token
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
} catch (err) {
    console.error("Register error:", err.message);
    if (err.code === 11000) {
      // Mongo duplicate key error (e.g. unique email)
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

//Define a POST route for user Login
router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOne({email});
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user._id);
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});


//me Route 

router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user);
 });

 //Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"})
};



export default router;
