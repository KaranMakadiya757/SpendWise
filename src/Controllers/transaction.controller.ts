import { Transaction } from "../Models/transaction.model";
import { SearchParams } from "../Types/transaction.types";
import { ApiError } from "../Utils/apiError";
import { ApiResponse } from "../Utils/apiResponse";
import { asyncHandler } from "../Utils/asyncHandler";

// get all transactions
const getAllTransactions = asyncHandler(async (req, res) => {
    // deconstruct search params
    const { page, limit, start, end, type, sort = -1, category }: SearchParams = req.query;

    // pagination options
    const option = {
        page: page as number,
        limit: limit as number,
        customLabels: {
            docs: "Transactions",
            totalDocs: "totalTransactions",
        },
    };

    // dynamic filters
    const match: any = { user: req.user?._id };

    // filter by date range
    if (start && end) {
        match.date = {
            $gte: new Date(start),
            $lte: new Date(end),
        };
    } else if (start) {
        match.date = { $gte: new Date(start) };
    } else if (end) {
        match.date = { $lte: new Date(end) };
    }

    // filter by type
    if (type) {
        match.type = type;
    }

    // filter by category
    if (category) {
        match.category = category;
    }

    // create aggregation for transaction
    const transactionPipeline = Transaction.aggregate([
        { $match: match },
        { $sort: { date: Number(sort) as 1 | -1 } },
        {
            $project: {
                _id: 1,
                date: 1,
                type: 1,
                amount: 1,
                description: 1,
                category: 1,
            },
        },
    ]);

    // fetch transactions
    const transctions = await Transaction.aggregatePaginate(transactionPipeline, option);

    // throw errors
    if (!transctions)
        throw new ApiError(500, "Internal server error", ["something went wrong while fetching transactions"]);

    // return respone
    return res.status(200).json(new ApiResponse(200, transctions, "Transactions Fetched Successfully !!!"));
});

// get transaction details
const getTransactionDetails = asyncHandler(async (req, res) => {
    // return the response
    return res.status(200).json(new ApiResponse(200, req.transaction, "Transaction Fetched Successfully !!!"));
});

// transaction analysis
const getTransactionsAnalysis = asyncHandler(async (req, res) => {
    // parse type param
    const { type } = req.query as { type?: string };

    const validTypes = ["weekly", "monthly", "yearly"] as const;
    const periodType = (validTypes as readonly string[]).includes((type || "").toLowerCase())
        ? (type as string).toLowerCase()
        : "weekly";

    // compute date range
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date(now);

    switch (periodType) {
        case "weekly": {
            // last 7 days including today
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 6);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
        }
        case "monthly": {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            break;
        }
        case "yearly": {
            startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
            endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
            break;
        }
    }

    // timeline group id format
    const groupFormat = (() => {
        switch (periodType) {
            case "yearly":
                return "%Y-%m"; // group by month
            default:
                return "%Y-%m-%d"; // group by day
        }
    })();

    const match: any = {
        user: req.user?._id,
        date: { $gte: startDate, $lte: endDate },
    };

    // build aggregation with facets
    const [result] = await Transaction.aggregate([
        { $match: match },
        {
            $facet: {
                summary: [
                    {
                        $group: {
                            _id: null,
                            income: {
                                $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
                            },
                            expense: {
                                $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
                            },
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            income: 1,
                            expense: 1,
                            net: { $subtract: ["$income", "$expense"] },
                            count: 1,
                            startDate: { $literal: startDate },
                            endDate: { $literal: endDate },
                            period: { $literal: periodType },
                        },
                    },
                ],
                timeline: [
                    {
                        $group: {
                            _id: { $dateToString: { format: groupFormat, date: "$date" } },
                            income: {
                                $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
                            },
                            expense: {
                                $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            period: "$_id",
                            income: 1,
                            expense: 1,
                            net: { $subtract: ["$income", "$expense"] },
                        },
                    },
                    { $sort: { period: 1 } },
                ],
                incomeByCategory: [
                    { $match: { type: "income" } },
                    {
                        $group: {
                            _id: { $ifNull: ["$category", "uncategorized"] },
                            total: { $sum: "$amount" },
                        },
                    },
                    { $project: { _id: 0, category: "$_id", total: 1 } },
                    { $sort: { total: -1 } },
                ],
                expenseByCategory: [
                    { $match: { type: "expense" } },
                    {
                        $group: {
                            _id: { $ifNull: ["$category", "uncategorized"] },
                            total: { $sum: "$amount" },
                        },
                    },
                    { $project: { _id: 0, category: "$_id", total: 1 } },
                    { $sort: { total: -1 } },
                ],
            },
        },
        {
            $project: {
                summary: { $ifNull: ["$summary", []] },
                timeline: { $ifNull: ["$timeline", []] },
                incomeByCategory: { $ifNull: ["$incomeByCategory", []] },
                expenseByCategory: { $ifNull: ["$expenseByCategory", []] },
            },
        },
    ]);

    const payload = {
        summary: (result && Array.isArray(result.summary) && result.summary[0]) || {
            income: 0,
            expense: 0,
            net: 0,
            count: 0,
            startDate,
            endDate,
            period: periodType,
        },
        timeline: (result && result.timeline) || [],
        incomeByCategory: (result && result.incomeByCategory) || [],
        expenseByCategory: (result && result.expenseByCategory) || [],
    };

    return res.status(200).json(new ApiResponse(200, payload, "Transaction analysis fetched successfully"));
});

// create tansaction
const createTransaction = asyncHandler(async (req, res) => {
    // add user id in the transaction body
    req.body.user = req.user?._id;

    // create transaction
    const transaction = await Transaction.create(req.body);

    // check wheather the transaction is created or not
    if (transaction) {
        await req.user?.updateBalance(req.body.amount, req.body.type);
    } else {
        throw new ApiError(500, "Internal server error", ["something went wrong while creating transaction"]);
    }

    // return response
    return res.status(201).json(new ApiResponse(201, transaction, "Transaction created successfully"));
});

// update transaction
const updateTransaction = asyncHandler(async (req, res) => {
    // update transaction
    const transaction = await Transaction.findByIdAndUpdate(req.transaction?._id, req.body, { new: true });

    // Throw error
    if (!transaction) throw new ApiError(500, "Internal server error");

    // remove old transaction from the wallet
    switch (req.body.type) {
        case "income": {
            await req.user?.updateBalance(req.transaction?.amount ?? 0, "expense");
            break;
        }
        case "expense": {
            await req.user?.updateBalance(req.transaction?.amount ?? 0, "income");
            break;
        }
    }

    // add new transaction to the wallet
    await req.user?.updateBalance(req.body.amount, req.body.type);

    // return response
    res.status(201).json(new ApiResponse(201, transaction, "transaction updated successfully"));
});

// delete transaction
const deleteTransaction = asyncHandler(async (req, res) => {
    // Delete the transaction from db
    const deletedTransaction = await Transaction.findByIdAndDelete(req.transaction?._id);

    // Throw error if video is not found
    if (!deletedTransaction) throw new ApiError(404, "Transaction not found !!");

    // remove old transaction from the wallet
    switch (req.transaction?.type) {
        case "income": {
            await req.user?.updateBalance(req.transaction?.amount ?? 0, "expense");
            break;
        }
        case "expense": {
            await req.user?.updateBalance(req.transaction?.amount ?? 0, "income");
            break;
        }
    }

    // return response
    return res.status(200).json(new ApiResponse(200, {}, "Transaction deleted sucessfully !!"));
});

export {
    getAllTransactions,
    getTransactionDetails,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsAnalysis,
};
