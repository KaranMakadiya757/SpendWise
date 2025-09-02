import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SpendWise API",
            version: "1.0.0",
            description: "A SpendWise API for financial management platform with Swagger docs",
        },
        tags: [
            { name: "Health Check" },
            { name: "Auth" },
            { name: "User" },
            { name: "Transaction" },
            { name: "Category" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: process.env.API_URL,
                description: "Version 1.0.0",
            },
        ],
    },
    apis: ["./src/Routes/*.ts", "./src/Controllers/*.ts"], // Paths to scan for Swagger JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
