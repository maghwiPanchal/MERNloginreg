import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const  userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,

    },
}, {timestamps: true}); //createdAt, updatedAt  

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next(); // don’t rehash if password hasn’t changed
    const salt = await bcrypt.genSalt(10); // generate random “salt”
    this.password = await bcrypt.hash(this.password, salt); // hash the password
    next();
});

// check if user entered password matches with the stored hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;