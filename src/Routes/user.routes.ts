import { Router } from "express";
import validate from "../Middlewares/validation.middleware";

import {
    registerUser,
    loginUser,
    sendOTP,
    verifyOTP,
    refreshAccessToken,
    changePassword,
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
} from "../Controllers/user.controller";

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
router.route("/register").post(validate(userValidationSchema), registerUser);

// login
router.route("/login").post(validate(userLoginValidationSchema), loginUser);

// send otp
router.route("/login/send-otp").post(validate(userLoginWithOtpValidationSchema), sendOTP);

// verify otp
router.route("/login/verify-otp").post(validate(userOtpValidationSchema), verifyOTP);

// refresh accesstoken
router.route("/refresh-token").post(refreshAccessToken);

// SECURED ROUTES

// get user details
router.route("/user").get(getUser);

// update user details
router.route("/user").patch(updateUser);

// change password
router.route("/changepassword").patch(validate(changepasswordValidationSchema), changePassword);

// logout
router.route("/logout").post(logoutUser);

// delete user
router.route("/user").delete(deleteUser);

export default router;
