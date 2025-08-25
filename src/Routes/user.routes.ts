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
router.route("/").get(getUser);

// update user details
router.route("/").put(upload.single("profilepic"), validate(userUpdateValidationSchema), updateUser);

// update user balance
router.route("/balance").patch(validate(userUpdateBalanceValidationSchema), updateUserBalance);

// delete user
router.route("/").delete(deleteUser);

export default router;
