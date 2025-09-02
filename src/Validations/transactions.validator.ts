import Joi from "joi";

const transactionValidationSchema = Joi.object({
    amount: Joi.number().required().min(0).messages({
        "number.base": "Amount must be a number",
        "number.min": "Amount cannot be negative",
        "any.required": "Amount is required",
    }),

    category: Joi.string().trim().lowercase().max(50).optional().allow("").messages({
        "string.base": "Category must be a string",
        "string.max": "Category must be at most 50 characters long",
    }),

    description: Joi.string().trim().lowercase().max(200).optional().allow("").messages({
        "string.base": "Description must be a string",
        "string.max": "Description must be at most 200 characters long",
    }),

    date: Joi.date().required().messages({
        "date.base": "Date must be a valid date",
        "date.less": "Date cannot be in the future",
        "any.required": "Date is required",
    }),

    type: Joi.string().valid("income", "expense").required().messages({
        "string.base": "Type must be a string",
        "any.only": "Type must be either 'income' or 'expense'",
        "any.required": "Type is required",
    }),
});

export { transactionValidationSchema };
