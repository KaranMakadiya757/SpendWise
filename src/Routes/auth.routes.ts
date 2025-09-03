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
 *             $ref: "#/components/requests/RegisterRequest"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/RegisterResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/register").post(upload.single("profilepic"), validate(userValidationSchema), registerUser);

// login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requests/LoginRequest"
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/LoginResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
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
 *             $ref: "#/components/requests/SendOtpRequest"
 *     responses:
 *       200:
 *         description: OTP sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/SendOtpResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
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
 *             $ref: "#/components/requests/VerifyOtpRequest"
 *     responses:
 *       200:
 *         description: OTP verified, logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/VerifyOtpResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requests/RefreshTokenRequest"
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/RefreshTokenResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requests/ChangePasswordRequest"
 *     responses:
 *       200:
 *         description: Password changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/ChangePasswordResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/changepassword").patch(validate(changepasswordValidationSchema), changePassword);

// logout
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/LogoutResponse"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/logout").post(logoutUser);

export default router;
