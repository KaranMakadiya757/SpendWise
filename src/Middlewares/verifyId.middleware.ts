import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../Utils/apiError";
import { asyncHandler } from "../Utils/asyncHandler";
import { Category } from "../Models/categories.model";
import { ICategoryDocument } from "../Types/category.types";
import { Transaction } from "../Models/transaction.model";
import { ITransactionDocument } from "../Types/transaction.types";

const verifyId = asyncHandler(async (req, res, next) => {
    const { categoryId, transactionId } = req.params;

    // Validate Category Id if provided
    if (categoryId) {
        if (!isValidObjectId(categoryId)) throw new ApiError(400, "Invalid Category ID");

        // find the Category from DB
        const category = (await Category.findById(new mongoose.Types.ObjectId(categoryId))) as ICategoryDocument;

        // throw error if Category is not found
        if (!category) {
            throw new ApiError(404, "Category Not Found !!");
        }

        // throw error if default category
        if (category.is_default) throw new ApiError(403, "Not allowed to modify or delete default category.");

        // set Category in the req
        req.category = category;
    }

    // Validate Transaction Id if provided
    if (transactionId) {
        if (!isValidObjectId(transactionId)) throw new ApiError(400, "Invalid Transaction ID");

        // find the Transaction from DB
        const transaction = (await Transaction.findById(
            new mongoose.Types.ObjectId(transactionId)
        )) as ITransactionDocument;

        // throw error if Transaction is not found
        if (!transaction) {
            throw new ApiError(404, "Transaction Not Found !!");
        }

        // set Transaction in the req
        req.transaction = transaction;
    }

    // move to next
    next();
});

export default verifyId;
