import { Aggregate, Document, Model, Types } from "mongoose";

export type TransactionType = "income" | "expense";

export interface ITransaction {
    _id: Types.ObjectId;
    amount: number;
    category?: string;
    description?: string;
    date: Date;
    type: TransactionType;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type ITransactionDocument = Document & ITransaction;

export type LeanTransaction = Omit<ITransaction, "_id">;

// Aggregate paginate plugin typings
export interface AggregatePaginateOptions {
    page?: number;
    limit?: number;
    customLabels?: Record<string, string>;
    allowDiskUse?: boolean;
    pagination?: boolean;
    sort?: Record<number, 1 | -1>;
}

export interface AggregatePaginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    page?: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage?: number | null;
    nextPage?: number | null;
    pagingCounter?: number;
    meta?: unknown;
}

export interface ITransactionModel extends Model<ITransactionDocument> {
    aggregatePaginate<T = ITransaction>(
        aggregate: Aggregate<T[]>,
        options?: AggregatePaginateOptions
    ): Promise<AggregatePaginateResult<T>>;
}

export interface SearchParams {
    page?: number;
    limit?: number;
    sort?: number;
    start?: Date;
    end?: Date;
    type?: TransactionType;
    category?: string;
}
