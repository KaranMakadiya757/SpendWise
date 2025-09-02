import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware";
import verifyId from "../Middlewares/verifyId.middleware";
import validate from "../Middlewares/validation.middleware";
import { transactionValidationSchema } from "../Validations/transactions.validator";

import {
    getAllTransactions,
    getTransactionDetails,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsAnalysis,
} from "../Controllers/transaction.controller";

// create router instance
const router = Router();

// secured routes
router.use(verifyJWT);

// get all transactions
/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: Get all transactions for current user
 *     tags: [Transaction]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.route("/").get(getAllTransactions);

// transaction analysis
/**
 * @swagger
 * /transaction/analysis:
 *   get:
 *     summary: Get transaction analysis
 *     tags: [Transaction]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Analysis data
 */
router.route("/analysis").get(getTransactionsAnalysis);

// get transaction details
/**
 * @swagger
 * /transaction/{transactionId}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction details
 *       404:
 *         description: Transaction not found
 */
router.route("/:transactionId").get(verifyId, getTransactionDetails);

// create tansaction
/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a transaction
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               categoryId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Validation error
 */
router.route("/").post(validate(transactionValidationSchema), createTransaction);

// update transaction
/**
 * @swagger
 * /transaction/{transactionId}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: transactionId
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
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               categoryId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Transaction not found
 */
router.route("/:transactionId").put(verifyId, validate(transactionValidationSchema), updateTransaction);

// delete transaction
/**
 * @swagger
 * /transaction/{transactionId}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 *       404:
 *         description: Transaction not found
 */
router.route("/:transactionId").delete(verifyId, deleteTransaction);

export default router;
