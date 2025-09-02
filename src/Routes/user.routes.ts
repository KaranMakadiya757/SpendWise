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
 *     responses:
 *       200:
 *         description: User profile
 */
router.route("/").get(getUser);

// update user details
/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update current user's profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               profilepic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Validation error
 */
router.route("/").put(upload.single("profilepic"), validate(userUpdateValidationSchema), updateUser);

// update user balance
/**
 * @swagger
 * /user/balance:
 *   patch:
 *     summary: Update current user's balance
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Balance updated
 *       400:
 *         description: Validation error
 */
router.route("/balance").patch(validate(userUpdateBalanceValidationSchema), updateUserBalance);

// delete user
/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete current user's account
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User deleted
 */
router.route("/").delete(deleteUser);

export default router;
