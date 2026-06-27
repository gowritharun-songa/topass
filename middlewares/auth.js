import jwt from "jsonwebtoken";
import User from "../models/schema.js";

export const auth = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token Provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.userId);

        if(!user) {
            return res.status(401).json({
                message: "Token is In Valid"
            });
        }

        req.user = user;
        next();

    } catch(error) {
        console.log(error.message);
        return res.status(401).json({
            message: "Invalid Token"

        })
    }
}