import { NextFunction, Request, Response, RequestHandler } from "express";
import { IRequest } from "../Types/IRequest.types";

type AsyncRequestHandler = (req: IRequest, res: Response, next: NextFunction) => Promise<unknown>;

const asyncHandler = (requestFunction: AsyncRequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestFunction(req, res, next)).catch((err: unknown) => next(err));
    };
};

export { asyncHandler };
