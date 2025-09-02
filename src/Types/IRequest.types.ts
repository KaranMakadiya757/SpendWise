import { Request } from "express";
import { IUserDocument } from "./user.types";
import { ICategoryDocument } from "./category.types";
import { ITransactionDocument } from "./transaction.types";

export interface IRequest extends Request {
    user?: IUserDocument;
    category?: ICategoryDocument;
    transaction?: ITransactionDocument;
}
