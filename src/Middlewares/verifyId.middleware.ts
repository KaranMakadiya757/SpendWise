import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../Utils/apiError";
import { asyncHandler } from "../Utils/asyncHandler";
import { Category } from "../Models/categories.model";
import { ICategoryDocument } from "../Types/category.types";

const verifyId = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;

    // Validate Video Id if provided
    if (categoryId) {
        if (!isValidObjectId(categoryId)) throw new ApiError(400, "Invalid Category ID");

        // find the video from DB
        const category = (await Category.findById(new mongoose.Types.ObjectId(categoryId))) as ICategoryDocument;

        // throw error if video is not found
        if (!category) {
            throw new ApiError(404, "Video Not Found !!");
        }

        // throw error if default category
        if (category.is_default) throw new ApiError(403, "Not allowed to modify or delete default category.");

        // set video in the req
        req.category = category;
    }

    // move to next
    next();
});

export default verifyId;
