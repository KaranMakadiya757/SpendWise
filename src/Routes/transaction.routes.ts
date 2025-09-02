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
router.route("/").get(getAllTransactions);

// transaction analysis
router.route("/analysis").get(getTransactionsAnalysis);

// get transaction details
router.route("/:transactionId").get(verifyId, getTransactionDetails);

// create tansaction
router.route("/").post(validate(transactionValidationSchema), createTransaction);

// update transaction
router.route("/:transactionId").put(verifyId, validate(transactionValidationSchema), updateTransaction);

// delete transaction
router.route("/:transactionId").delete(verifyId, deleteTransaction);

export default router;
