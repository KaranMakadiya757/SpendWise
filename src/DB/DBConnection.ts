import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );
        console.log(
            `MongoDB connected !! DB Host : ${connection.connection.name} ✅`
        );
    } catch (error) {
        console.error("connection error ❌", error);
        process.exit(1);
    }
};

export default connectDB;
