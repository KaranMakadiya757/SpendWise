import { Document, Types } from "mongoose";

export interface ICategory {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    is_default: boolean;
    user?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type ICategoryDocument = Document & ICategory;

export type LeanCategory = ICategory;
