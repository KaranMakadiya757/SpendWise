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
 *     summary: Get all transactions for the current user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Page number for pagination (default: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Number of records per page (default: 10)"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Filter by transaction type
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter transactions from this date (YYYY-MM-DD)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter transactions up to this date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/TransactionListResponse"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/").get(getAllTransactions);

// transaction analysis
/**
 * @swagger
 * /transaction/analysis:
 *   get:
 *     summary: Get transaction analysis for the current user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for analysis (YYYY-MM-DD)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for analysis (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Transaction analysis data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/TransactionAnalysisResponse"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/analysis").get(getTransactionsAnalysis);

// get transaction details
/**
 * @swagger
 * /transaction/{transactionId}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to retrieve
 *     responses:
 *       200:
 *         description: Transaction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/TransactionDetailResponse"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       404:
 *         $ref: "#/components/errors/NotFoundError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/:transactionId").get(verifyId, getTransactionDetails);

// create tansaction
/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requests/TransactionCreateRequest"
 *     responses:
 *       201:
 *         description: Transaction created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/TransactionCreateResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/").post(validate(transactionValidationSchema), createTransaction);

// update transaction
/**
 * @swagger
 * /transaction/{transactionId}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/requests/TransactionUpdateRequest"
 *     responses:
 *       200:
 *         description: Transaction updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/TransactionUpdateResponse"
 *       400:
 *         $ref: "#/components/errors/ValidationError"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       404:
 *         $ref: "#/components/errors/NotFoundError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/:transactionId").put(verifyId, validate(transactionValidationSchema), updateTransaction);

// delete transaction
/**
 * @swagger
 * /transaction/{transactionId}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to delete
 *     responses:
 *       200:
 *         description: Transaction deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/TransactionDeleteResponse"
 *       401:
 *         $ref: "#/components/errors/UnauthorizedError"
 *       404:
 *         $ref: "#/components/errors/NotFoundError"
 *       500:
 *         $ref: "#/components/errors/ServerError"
 */
router.route("/:transactionId").delete(verifyId, deleteTransaction);

export default router;
