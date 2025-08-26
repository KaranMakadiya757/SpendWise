import { Request } from "express";
import { IUserDocument } from "./user.types";
import { ICategoryDocument } from "./category.types";

export interface IRequest extends Request {
    user?: IUserDocument;
    category?: ICategoryDocument;
}
