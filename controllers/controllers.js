import bcrypt from "bcryptjs";

import User from "../models/schema.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

// export const getUsers = async (req, res, next) => {
//     try {
//         const users = await User.find();
//         return res.status(200).json({
//             message: "Users fetched Successfully",
//             data: users
//         });
//
//     } catch (error) {
//         next(error);
//     }
// }

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        data: users
    });
});

export const getUserById = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if(!user) {
        throw new AppError("User not Found", 404);
    }
    res.status(200).json({
        message: "User Found",
        data: user
    });
});

export const postUser = asyncHandler( async (req, res) => {
    const { name, age, email, password, role } = req.body;
    if(!name || !email || !password) {
        throw new AppError("All Fields are required", 400);
    }

    let user = await User.findOne({email});
    if(user) {
        throw new AppError("User already Exists", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name, age, email, password: hashedPassword, role: "user"
    });

    return res.status(201).json({
        message: "User created",
        data: newUser
    });
});

export const putUser = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const { name, age, email, password } = req.body;

    let updatedData = { name, age, email, password };
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {new: true, runValidators: true});
    if(!updatedUser) {
        throw new AppError("User not Found", 404);
    }

    return res.status(200).json({
        message: "User updated Successfully",
        data: updatedUser
    })
});

// Update user by the fields only gotten provided
export const patchUser = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if(!updatedUser) {
        throw new AppError("User not Found", 404);
    }
    return res.status(200).json({
        message: "User updated Successfully",
        data: updatedUser
    });
});

// Delete user
export const deleteUser = asyncHandler( async (req, res, next) => {
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if(!deletedUser) {
        throw new AppError("User not Found", 404);
    }
    return res.status(200).json({
        message: "User Deleted Successfully",
        data: deletedUser
    })
});
