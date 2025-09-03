import { Router } from "express";
import { upload } from "../Middlewares/multer.middleware";
import { verifyJWT } from "../Middlewares/auth.middleware";
import validate from "../Middlewares/validation.middleware";

import { getUser, updateUser, deleteUser, updateUserBalance } from "../Controllers/user.controller";

import { userUpdateBalanceValidationSchema, userUpdateValidationSchema } from "../Validations/user.validator";

// create router instance
const router = Router();

// SECURED ROUTES
router.use(verifyJWT);

// get user details
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get current user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/UserProfileResponse"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       404:
 *         $ref: "#/components/errors/NotFoundError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/").get(getUser);

// update user details
/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update current user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/requests/UpdateUserRequest"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/UpdateUserResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/").put(upload.single("profilepic"), validate(userUpdateValidationSchema), updateUser);

// update user balance
/**
 * @swagger
 * /user/balance:
 *   patch:
 *     summary: Update current user's balance
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requests/UpdateBalanceRequest"
 *     responses:
 *       200:
 *         description: Balance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/UpdateBalanceResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/balance").patch(validate(userUpdateBalanceValidationSchema), updateUserBalance);

// delete user
/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete current user's account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/DeleteUserResponse"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       404:
 *         $ref: "#/components/errors/NotFoundError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/").delete(deleteUser);

export default router;
