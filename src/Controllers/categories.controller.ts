import { Category } from "../Models/categories.model";
import { ApiError } from "../Utils/apiError";
import { ApiResponse } from "../Utils/apiResponse";
import { asyncHandler } from "../Utils/asyncHandler";

// get category
const getCategories = asyncHandler(async (req, res) => {
    // create aggregation for categories
    const categories = await Category.aggregate([
        {
            $match: { $or: [{ user: req.user?._id }, { is_default: true }] },
        },
    ]);

    // Throw error if categories are not found
    if (!categories)
        throw new ApiError(500, "Internal server error", ["something went wrong while fetching categories"]);

    // return resposne
    res.status(200).json(new ApiResponse(200, categories, "categories fetched successfully"));
});

// add category
const addCategory = asyncHandler(async (req, res) => {
    // add user id in category
    req.body.user = req.user?._id;

    // create new category
    const category = await Category.create(req.body);

    // Throw error
    if (!category) throw new ApiError(500, "Internal server error");

    // return response
    res.status(201).json(new ApiResponse(201, category, "category added successfully"));
});

// update category
const updateCategory = asyncHandler(async (req, res) => {
    // update category
    const category = await Category.findByIdAndUpdate(req.category?._id, req.body, { new: true });

    // Throw error
    if (!category) throw new ApiError(500, "Internal server error");

    // return response
    res.status(201).json(new ApiResponse(201, category, "category updated successfully"));
});

// delete category
const deleteCategory = asyncHandler(async (req, res) => {
    // Delete the user from db
    const deletedCategory = await Category.findByIdAndDelete(req.category?._id);

    // Throw error if video is not found
    if (!deletedCategory) throw new ApiError(404, "Category not found !!");

    // return response
    return res.status(200).json(new ApiResponse(200, {}, "Category deleted sucessfully !!"));
});

export { getCategories, addCategory, updateCategory, deleteCategory };
