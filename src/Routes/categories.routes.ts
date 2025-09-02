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
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories for current user
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.route("/").get(getCategories);

// add category
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Validation error
 */
router.route("/").post(validate(categoryValidationSchema), addCategory);

// update category
/**
 * @swagger
 * /category/{categoryId}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Category not found
 */
router.route("/:categoryId").put(validate(categoryValidationSchema), verifyId, updateCategory);

// delete category
/**
 * @swagger
 * /category/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.route("/:categoryId").delete(verifyId, deleteCategory);

export default router;
