import { response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// src/utils/swaggerUtils.ts

/**
 * Utility to build a standard response schema
 * @param message Example success message
 * @param statusCode Example status code
 * @param data Schema reference or object
 */
export const successResponse = (
    message: string,
    statusCode: number,
    data: object | { $ref: string } | null = null
) => ({
    type: "object",
    properties: {
        success: { type: "boolean", example: true },
        statusCode: { type: "integer", example: statusCode },
        message: { type: "string", example: message },
        data: data ?? { type: "object", nullable: true },
    },
});

/**
 * Utility to build an error response schema
 * @param message Example error message
 * @param statusCode Example status code
 */
export const errorResponse = (message: string, statusCode: number) => ({
    type: "object",
    properties: {
        success: { type: "boolean", example: false },
        statusCode: { type: "integer", example: statusCode },
        message: { type: "string", example: message },
        errors: {
            type: "array",
            items: { type: "string" },
            example: ["Error descriptions"],
        },
    },
});

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SpendWise API",
            version: "1.0.0",
            description: "A SpendWise API for financial management platform with Swagger docs",
        },
        servers: [
            {
                url: process.env.API_URL,
                description: "Version 1.0.0",
            },
        ],
        tags: [
            { name: "Health Check", description: "API health status" },
            { name: "Auth", description: "Authentication and session management" },
            { name: "User", description: "User profile operations" },
            { name: "Transaction", description: "Transaction management" },
            { name: "Category", description: "Expense and income categories" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },

            schemas: {
                SuccessResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        statusCode: { type: "integer", example: 200 },
                        message: { type: "string", example: "Operation successful" },
                        data: { type: "object", nullable: true },
                    },
                },

                ApiError: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        statusCode: { type: "integer", example: 400 },
                        message: { type: "string", example: "Validation failed" },
                        errors: {
                            type: "array",
                            items: { type: "string" },
                            example: ["Error descriptions"],
                        },
                    },
                },

                User: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "66f3a9d5e7f2f4a1c8b8a123" },
                        fullname: { type: "string", example: "Karan Makadiya" },
                        email: { type: "string", format: "email", example: "karan@example.com" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },

                Transaction: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "txn_12345" },
                        title: { type: "string", example: "Grocery Shopping" },
                        amount: { type: "number", format: "float", example: 120.5 },
                        type: { type: "string", enum: ["income", "expense"], example: "expense" },
                        categoryId: { type: "string", example: "cat_6789" },
                        date: { type: "string", format: "date", example: "2025-09-03" },
                        notes: { type: "string", nullable: true, example: "Bought fruits and veggies" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },

                Category: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "cat_12345" },
                        name: { type: "string", example: "Food" },
                        type: { type: "string", enum: ["income", "expense"], example: "expense" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
            },

            requests: {
                RegisterRequest: {
                    type: "object",
                    required: ["username", "email", "fullname", "password"],
                    properties: {
                        username: { type: "string", example: "karan123" },
                        email: { type: "string", format: "email", example: "karan@example.com" },
                        fullname: { type: "string", example: "Karan Makadiya" },
                        password: { type: "string", format: "password", example: "Pass@123" },
                        profilepic: { type: "string", format: "binary" },
                    },
                },

                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", format: "email", example: "karan@example.com" },
                        password: { type: "string", format: "password", example: "Pass@123" },
                    },
                },

                SendOtpRequest: {
                    type: "object",
                    required: ["email"],
                    properties: {
                        email: { type: "string", format: "email", example: "karan@example.com" },
                    },
                },

                VerifyOtpRequest: {
                    type: "object",
                    required: ["email", "otp"],
                    properties: {
                        email: { type: "string", format: "email", example: "karan@example.com" },
                        otp: { type: "number", example: 123456 },
                    },
                },

                RefreshTokenRequest: {
                    type: "object",
                    required: ["refreshToken"],
                    properties: {
                        refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." },
                    },
                },

                ChangePasswordRequest: {
                    type: "object",
                    required: ["oldPassword", "newPassword"],
                    properties: {
                        oldPassword: { type: "string", format: "password", example: "OldPass@123" },
                        newPassword: { type: "string", format: "password", example: "NewPass@456" },
                    },
                },

                UpdateUserRequest: {
                    type: "object",
                    properties: {
                        fullname: { type: "string", example: "Karan Makadiya" },
                        profilepic: { type: "string", format: "binary" },
                    },
                },

                UpdateBalanceRequest: {
                    type: "object",
                    required: ["balance"],
                    properties: {
                        balance: { type: "number", example: 5000.75 },
                    },
                },

                CategoryRequest: {
                    type: "object",
                    required: ["name", "type"],
                    properties: {
                        name: { type: "string", example: "Food" },
                        type: { type: "string", enum: ["income", "expense"], example: "expense" },
                    },
                },

                UpdateCategoryRequest: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "Food & Beverages" },
                        type: { type: "string", enum: ["income", "expense"], example: "expense" },
                    },
                },

                TransactionCreateRequest: {
                    type: "object",
                    required: ["amount", "type", "categoryId", "date"],
                    properties: {
                        amount: { type: "number", example: 1200 },
                        type: { type: "string", enum: ["income", "expense"], example: "expense" },
                        categoryId: { type: "string", example: "64a2c3f7d8e9a123456789ab" },
                        date: { type: "string", format: "date", example: "2025-09-03" },
                        note: { type: "string", example: "Grocery shopping" },
                    },
                },

                TransactionUpdateRequest: {
                    type: "object",
                    properties: {
                        amount: { type: "number", example: 1500 },
                        type: { type: "string", enum: ["income", "expense"], example: "income" },
                        categoryId: { type: "string", example: "64a2c3f7d8e9a123456789ab" },
                        date: { type: "string", format: "date", example: "2025-09-03" },
                        note: { type: "string", example: "Salary credited" },
                    },
                },
            },

            responses: {
                RegisterResponse: successResponse("User registered successfully", 201, {
                    type: "object",
                    properties: {
                        user: { $ref: "#/components/schemas/User" },
                        token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." },
                    },
                }),

                LoginResponse: successResponse("Login successful", 200, {
                    type: "object",
                    properties: {
                        token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." },
                        user: { $ref: "#/components/schemas/User" },
                    },
                }),

                SendOtpResponse: successResponse("OTP sent successfully", 200, {
                    type: "object",
                    properties: {
                        email: { type: "string", format: "email", example: "karan@example.com" },
                        otpExpiresIn: {
                            type: "integer",
                            example: 300,
                            description: "Time in seconds until OTP expires",
                        },
                    },
                }),

                VerifyOtpResponse: successResponse("OTP verified successfully, user logged in", 200, {
                    type: "object",
                    properties: {
                        token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." },
                        user: { $ref: "#/components/schemas/User" },
                    },
                }),

                RefreshTokenResponse: successResponse("New access token issued", 200, {
                    type: "object",
                    properties: {
                        accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." },
                        refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." },
                    },
                }),

                ChangePasswordResponse: successResponse("Password changed successfully", 200, null),

                LogoutResponse: successResponse("Logged out successfully", 200, null),

                UserProfileResponse: successResponse("User profile fetched successfully", 200, {
                    $ref: "#/components/schemas/User",
                }),

                UpdateUserResponse: successResponse("User profile updated successfully", 200, {
                    $ref: "#/components/schemas/User",
                }),

                UpdateBalanceResponse: successResponse("Balance updated successfully", 200, {
                    type: "object",
                    properties: {
                        userId: { type: "string", example: "66f3a9d5e7f2f4a1c8b8a123" },
                        balance: { type: "number", example: 5000.75 },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                }),

                DeleteUserResponse: successResponse("User account deleted successfully", 200, {
                    type: "object",
                    example: {},
                }),

                CategoryListResponse: successResponse("Categories fetched successfully", 200, {
                    type: "array",
                    items: { $ref: "#/components/schemas/Category" },
                }),

                CategoryResponse: successResponse("Category created successfully", 201, {
                    $ref: "#/components/schemas/Category",
                }),

                UpdateCategoryResponse: successResponse("Category updated successfully", 200, {
                    $ref: "#/components/schemas/Category",
                }),

                DeleteCategoryResponse: successResponse("Category deleted successfully", 200, null),

                TransactionListResponse: successResponse("Transactions fetched successfully", 200, {
                    type: "object",
                    properties: {
                        total: { type: "integer", example: 42 },
                        page: { type: "integer", example: 1 },
                        limit: { type: "integer", example: 10 },
                        transactions: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Transaction" },
                        },
                    },
                }),

                TransactionAnalysisResponse: successResponse("Transaction analysis fetched successfully", 200, {
                    type: "object",
                    properties: {
                        totalIncome: { type: "number", example: 5000 },
                        totalExpense: { type: "number", example: 3200 },
                        balance: { type: "number", example: 1800 },
                        breakdown: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    category: { type: "string", example: "Food" },
                                    type: { type: "string", enum: ["income", "expense"], example: "expense" },
                                    total: { type: "number", example: 1200 },
                                },
                            },
                        },
                    },
                }),

                TransactionDetailResponse: successResponse("Transaction fetched successfully", 200, {
                    $ref: "#/components/schemas/Transaction",
                }),

                TransactionCreateResponse: successResponse("Transaction created successfully", 201, {
                    $ref: "#/components/schemas/Transaction",
                }),

                TransactionUpdateResponse: successResponse("Transaction updated successfully", 200, {
                    $ref: "#/components/schemas/Transaction",
                }),

                TransactionDeleteResponse: successResponse("Transaction deleted successfully", 200, {
                    type: "object",
                    example: {},
                }),
            },

            errors: {
                ValidationError: {
                    description: "Validation error",
                    content: {
                        "application/json": {
                            schema: errorResponse("Missing required fields", 400),
                        },
                    },
                },
                UnauthorizedError: {
                    description: "Unauthorized request",
                    content: {
                        "application/json": {
                            schema: errorResponse("Unauthorized request", 401),
                        },
                    },
                },
                NotFoundError: {
                    description: "Resource not found",
                    content: {
                        "application/json": {
                            schema: errorResponse("Resource not found", 404),
                        },
                    },
                },
                ServerError: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: errorResponse("Internal server error", 500),
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/Routes/*.ts", "./src/Controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
