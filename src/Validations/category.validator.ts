import Joi from "joi";

const categoryValidationSchema = Joi.object({
    name: Joi.string().trim().required().min(3).max(50).messages({
        "string.base": "Category name must be a string",
        "string.empty": "Category name is required",
        "string.min": "Category name must be at least 3 characters long",
        "string.max": "Category name must be at most 50 characters long",
        "any.required": "Category name is required",
    }),
});

export { categoryValidationSchema };
