import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 16,
        required: true
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 70

    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps: true,
    createdAt: true
});

const User = mongoose.model("User", usersSchema);
export default User;