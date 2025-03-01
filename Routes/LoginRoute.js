import express from "express";
import Login from "../Model/Login.js";

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Login.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (password !== user.password) { 
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = user.generateAuthToken();
        res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
