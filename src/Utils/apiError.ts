class ApiError extends Error {
    statusCode: number;
    success: boolean;
    errors: string[];
    data: unknown | null;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: string[] = [],
        stack: string = ""
    ) {
        super(message);

        this.name = "ApiError";
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            // Optional chaining for environments where captureStackTrace may not exist
            Error.captureStackTrace?.(
                this,
                this.constructor as unknown as Function
            );
        }
    }
}

export { ApiError };
