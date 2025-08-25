import { Request } from "express";
import { IUserDocument } from "./user.types";

export interface IRequest extends Request {
    user?: IUserDocument;
}
