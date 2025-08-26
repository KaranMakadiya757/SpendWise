import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../Controllers/categories.controller";
import verifyId from "../Middlewares/verifyId.middleware";
import validate from "../Middlewares/validation.middleware";
import { categoryValidationSchema } from "../Validations/category.validator";

// create router instance
const router = Router();

// secured routes
router.use(verifyJWT);

// get category
router.route("/").get(getCategories);

// add category
router.route("/").post(validate(categoryValidationSchema), addCategory);

// update category
router.route("/:categoryId").put(validate(categoryValidationSchema), verifyId, updateCategory);

// delete category
router.route("/:categoryId").delete(verifyId, deleteCategory);

export default router;
