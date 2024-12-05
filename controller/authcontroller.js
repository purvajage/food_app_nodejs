const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// Register
const registercontroller = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body;

        // Validation
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields.",
            });
        }

        // Check if user exists
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Email already registered. Please login.",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await usermodel.create({
            userName, // Corrected to match the field
            email,
            password: hashedPassword, // Use a colon instead of a semicolon
            phone,
            address,
            answer,
        });

        res.status(201).send({
            success: true,
            message: "Successfully registered",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in register API",
            error,
        });
    }
};

// Login
const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password.",
            });
        }

        // Check if user exists
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found. Please register.",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials.",
            });
        }

        // Generate token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Remove password before sending response
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login API",
            error,
        });
    }
};

module.exports = { registercontroller, logincontroller };
