import mongoose, { Schema } from "mongoose";
import { ITransactionDocument, ITransactionModel } from "../Types/transaction.types";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const transactionSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            lowercase: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["income", "expense"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

transactionSchema.plugin(aggregatePaginate);

export const Transaction = mongoose.model<ITransactionDocument, ITransactionModel>("Transaction", transactionSchema);
