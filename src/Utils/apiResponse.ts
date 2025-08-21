class ApiResponse<TData = unknown> {
    success: boolean;
    statusCode: number;
    message: string;
    data: TData;

    constructor(statusCode: number, data: TData, message: string = "Success") {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export { ApiResponse };
