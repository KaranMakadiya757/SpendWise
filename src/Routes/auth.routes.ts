import { Router } from "express";
import { upload } from "../Middlewares/multer.middleware";
import { verifyJWT } from "../Middlewares/auth.middleware";
import validate from "../Middlewares/validation.middleware";

import {
    registerUser,
    loginUser,
    sendOTP,
    verifyOTP,
    refreshAccessToken,
    changePassword,
    logoutUser,
} from "../Controllers/auth.controller";

import {
    userValidationSchema,
    userLoginValidationSchema,
    changepasswordValidationSchema,
    userLoginWithOtpValidationSchema,
    userOtpValidationSchema,
} from "../Validations/user.validator";

// create router instance
const router = Router();

// register
router.route("/register").post(upload.single("profilepic"), validate(userValidationSchema), registerUser);

// login
router.route("/login").post(validate(userLoginValidationSchema), loginUser);

// send otp
router.route("/login/send-otp").post(validate(userLoginWithOtpValidationSchema), sendOTP);

// verify otp
router.route("/login/verify-otp").post(validate(userOtpValidationSchema), verifyOTP);

// refresh accesstoken
router.route("/refresh-token").post(refreshAccessToken);

// SECURED ROUTES
router.use(verifyJWT);

// change password
router.route("/changepassword").patch(validate(changepasswordValidationSchema), changePassword);

// logout
router.route("/logout").post(logoutUser);

export default router;
