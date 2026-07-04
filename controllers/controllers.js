import bcrypt from "bcryptjs";

import User from "../models/schema.js";

export const getUsers = async (req, res, next) => {
    try {
        throw new Error("For Testing Purposes");

        const users = await User.find();
        if(users.length === 0) {
            return res.status(400).json({
                message: "No Users Found",
            })
        }
        return res.status(200).json({
            message: "Users fetched Successfully",
            data: users
        });
    } catch(error) {
        next(error);
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if(!user) {
            res.status(404).json({
                message: "User not Found",
            });
        }
        return res.status(200).json({
            message: "User Found",
            data: user
        });
    } catch(error) {
        console.log("Error in getUserById ");
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const postUser = async (req, res) => {
    try {
        const { name, age, email, password, role } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "All fields were requires"
            });
        }

        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                message: "User already Exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name, age, email, password: hashedPassword, role
        });

        return res.status(201).json({
            message: "User created",
            data: newUser
        });

    } catch(error) {
        console.log("Error in putUser: ", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const putUser = async (req, res) => {
    const { id } = req.params;
    const { name, age, email, password } = req.body;

    try {
        let updatedData = { name, age, email, password };
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {new: true, runValidators: true});
        if(!updatedUser) {
            return res.status(404).json({
                message: "User not Found"
            });
        }

        return res.status(200).json({
            message: "User updated Successfully",
            data: updatedUser
        })

    } catch(error) {
        console.log("Error in putUser");
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const patchUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(!updatedUser) {
            return res.status(404).json({
                message: "User not Found",
            });
        }
        return res.status(200).json({
            message: "User updated Successfully",
            data: updatedUser
        });
    } catch(error) {
        console.error("Error in Patch User");
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "User Deleted Successfully",
            data: deletedUser
        })

    } catch(error) {
        console.error("Error in deleteUser", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}
