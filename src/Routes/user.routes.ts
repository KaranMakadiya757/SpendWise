import { Router } from "express";

// create router instance
const router = Router();

// register
router.route("/register").post();

// login
router.route("/login").post();

// send otp
router.route("/login/send-otp").post();

// verify otp
router.route("/login/verify-otp").post();

// refresh accesstoken
router.route("/refresh-token").post();

// SECURED ROUTES

// get user details
router.route("/user").get();

// update user details
router.route("/user").patch();

// change password
router.route("/changepassword").patch();

// logout
router.route("/logout").post();

// delete user
router.route("/user").delete();

export default router;
