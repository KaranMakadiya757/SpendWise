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
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               fullname:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               profilepic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 */
router.route("/register").post(upload.single("profilepic"), validate(userValidationSchema), registerUser);

// login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email/username and password
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: email or username
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.route("/login").post(validate(userLoginValidationSchema), loginUser);

// send otp
/**
 * @swagger
 * /auth/login/send-otp:
 *   post:
 *     summary: Send OTP for passwordless login
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: email or username
 *     responses:
 *       200:
 *         description: OTP sent
 *       400:
 *         description: Validation error
 */
router.route("/login/send-otp").post(validate(userLoginWithOtpValidationSchema), sendOTP);

// verify otp
/**
 * @swagger
 * /auth/login/verify-otp:
 *   post:
 *     summary: Verify OTP for passwordless login
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified, logged in
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid or expired OTP
 */
router.route("/login/verify-otp").post(validate(userOtpValidationSchema), verifyOTP);

// refresh accesstoken
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     security: []
 *     responses:
 *       200:
 *         description: New access token issued
 */
router.route("/refresh-token").post(refreshAccessToken);

// SECURED ROUTES
router.use(verifyJWT);

// change password
/**
 * @swagger
 * /auth/changepassword:
 *   patch:
 *     summary: Change current user's password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.route("/changepassword").patch(validate(changepasswordValidationSchema), changePassword);

// logout
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.route("/logout").post(logoutUser);

export default router;
