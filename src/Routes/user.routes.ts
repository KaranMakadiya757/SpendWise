import { Router } from "express";

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

// create router instance
const router = Router();

// register
router.route("/register").post(registerUser);

// login
router.route("/login").post(loginUser);

// send otp
router.route("/login/send-otp").post(sendOTP);

// verify otp
router.route("/login/verify-otp").post(verifyOTP);

// refresh accesstoken
router.route("/refresh-token").post(refreshAccessToken);

// SECURED ROUTES

// get user details
router.route("/user").get(getUser);

// update user details
router.route("/user").patch(updateUser);

// change password
router.route("/changepassword").patch(changePassword);

// logout
router.route("/logout").post(logoutUser);

// delete user
router.route("/user").delete(deleteUser);

export default router;
