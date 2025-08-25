import Joi from "joi";

const userValidationSchema = Joi.object({
    name: Joi.string()
        .trim()
        .lowercase()
        .required()
        .min(3)
        .max(10)
        .pattern(/^[a-zA-Z0-9_]+$/)
        .messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "any.required": "Name is required",
            "string.min": "Name must be at least 3 characters long",
            "string.max": "Name must not exceed 10 characters",
            "string.pattern.base": "Only alphanumeric characters and underscore are allowed",
        }),

    surname: Joi.string()
        .trim()
        .lowercase()
        .required()
        .min(3)
        .max(10)
        .pattern(/^[a-zA-Z0-9_]+$/)
        .messages({
            "string.base": "Surname must be a string",
            "string.empty": "Surname is required",
            "any.required": "Surname is required",
            "string.min": "Surname must be at least 3 characters long",
            "string.max": "Surname must not exceed 10 characters",
            "string.pattern.base": "Only alphanumeric characters and underscore are allowed",
        }),

    email: Joi.string().trim().lowercase().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),

    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/)
        .required()
        .messages({
            "string.base": "Password must be a string",
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters long",
            "string.pattern.base":
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            "any.required": "Password is required",
        }),

    profilepic: Joi.string().trim().optional().allow("").allow(null).messages({
        "string.base": "Profile picture must be a string",
        "string.empty": "Profile picture is required",
    }),

    phonenumber: Joi.string()
        .trim()
        .required()
        .pattern(/^\d{10}$/)
        .messages({
            "string.base": "Phone number must be a string",
            "string.empty": "Phone number is required",
            "any.required": "Phone number is required",
            "string.pattern.base": "Phone number must contain exactly 10 digits",
        }),

    dob: Joi.date().required().less("now").messages({
        "date.base": "Date of birth must be a valid date",
        "any.required": "Date of birth is required",
        "date.less": "Date of birth must be in the past",
    }),

    gender: Joi.string().valid("male", "female", "other").required().messages({
        "string.base": "Gender must be a string",
        "any.only": "Gender must be one of 'male', 'female', or 'other'",
        "any.required": "Gender is required",
    }),
    wallet_balance: Joi.number().optional().min(0).messages({
        "number.base": "Wallet balance must be a number",
        "number.min": "Wallet balance cannot be negative",
    }),
});

const userLoginValidationSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),

    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/)
        .required()
        .messages({
            "string.base": "Password must be a string",
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters long",
            "string.pattern.base":
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            "any.required": "Password is required",
        }),
});

const userLoginWithOtpValidationSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
});

const userOtpValidationSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),

    otp: Joi.number().integer().min(100000).max(999999).required().messages({
        "number.base": "OTP must be a number",
        "number.min": "OTP must be 6 digits long",
        "number.max": "OTP must be 6 digits long",
        "any.required": "OTP is required",
    }),
});

const changepasswordValidationSchema = Joi.object({
    oldPassword: Joi.string()
        .required()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/)
        .messages({
            "string.empty": "Old Password cannot be empty",
            "string.min": "Old Password must be at least 8 characters long",
            "string.pattern.base":
                "Old Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            "any.required": "Old Password is required",
        }),

    newPassword: Joi.string()
        .required()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/)
        .invalid(Joi.ref("oldPassword"))
        .messages({
            "string.empty": "New Password cannot be empty",
            "string.min": "New Password must be at least 8 characters long",
            "string.pattern.base":
                "New Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
            "any.invalid": "New Password must not be the same as the Old Password",
            "any.required": "New Password is required",
        }),
});

export {
    userValidationSchema,
    userLoginValidationSchema,
    changepasswordValidationSchema,
    userLoginWithOtpValidationSchema,
    userOtpValidationSchema,
};
