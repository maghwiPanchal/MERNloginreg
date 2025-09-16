import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// Allow requests from your React dev server
app.use(cors({ origin: "http://localhost:5174", credentials: true }));

// Parse JSON bodies (for login/register)
app.use(express.json());

// Root route for health check
app.get("/", (req, res) => {
  res.send("API is running");
});

// Mount auth routes under /api/auth
app.use("/user", authRoutes);

// Start server only after successful DB connection
const start = async () => {
  try {
    await connectDB(); // ensure MongoDB is connected first
    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

start();