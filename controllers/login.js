import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/schema.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user with the email
        const user = await User.findOne({email});
        if(!user) {
            console.log("User not Found");
            return res.status(404).json({
                message: "User not Found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        );

        // Adds everything other than password
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({
            message: "Login Success",
            data: userData,
            token: token
        });

    } catch(error) {
        console.log("Error in loginUser: ", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}