import { ApiError } from "../Utils/apiError";
import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

const validate = (schema: Schema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const isBodyEmpty = !req.body || Object.keys(req.body).length === 0;
        const hasNoFile = !req.file && (!req.files || Object.keys(req.files).length === 0);

        if (isBodyEmpty && hasNoFile) {
            throw new ApiError(400, "Bad Request !! No Payload Provided");
        }

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const validationErrors = error.details.map((detail: any) => detail.message);

            throw new ApiError(400, "Bad Request", validationErrors);
        }

        next();
    };
};

export default validate;
