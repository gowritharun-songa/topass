import mongoose from "mongoose";

const connectDB = async () => {
    const connection = process.env.MONGO_URI;
    try {
        await mongoose.connect(connection);
        console.log("Database Connection Established");
    } catch(error) {
        console.log("Unable to connect to DB", error.message);
        process.exit(1);
    }
}

export default connectDB;
// connection string: mongodb://localhost:27017/