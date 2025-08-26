import mongoose, { Schema } from "mongoose";
import { ICategory } from "../Types/category.types";

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            trim: true,
        },
        is_default: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Category = mongoose.model<ICategory, mongoose.Model<ICategory>>("Category", categorySchema);
