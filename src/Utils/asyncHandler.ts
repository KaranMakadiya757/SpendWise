import { NextFunction, Request, Response, RequestHandler } from "express";

type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<unknown>;

const asyncHandler = (requestFunction: AsyncRequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestFunction(req, res, next)).catch((err: unknown) =>
            next(err)
        );
    };
};

export { asyncHandler };
