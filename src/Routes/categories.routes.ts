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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CategoryListResponse"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/").get(getCategories);

// add category
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requests/CategoryRequest"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/CategoryResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/").post(validate(categoryValidationSchema), addCategory);

// update category
/**
 * @swagger
 * /category/{categoryId}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requests/UpdateCategoryRequest"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/UpdateCategoryResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       404:
 *         $ref: "#/components/errors/NotFoundError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/:categoryId").put(validate(categoryValidationSchema), verifyId, updateCategory);

// delete category
/**
 * @swagger
 * /category/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/DeleteCategoryResponse"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       404:
 *         $ref: "#/components/errors/NotFoundError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/:categoryId").delete(verifyId, deleteCategory);

export default router;
