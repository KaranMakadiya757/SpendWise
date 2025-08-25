import { asyncHandler } from "../Utils/asyncHandler";
import { ApiError } from "../Utils/apiError";
import { User } from "../Models/user.model";
import { ApiResponse } from "../Utils/apiResponse";
import { deleteFromCloudinary, uploadOnCloudinary } from "../Utils/fileOperation";

// get user details
const getUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User fetched sucessfully"));
});

// update user details
const updateUser = asyncHandler(async (req, res) => {
    // Get Avatar and Cover Image Local Path
    const profileLocalPath = req.file?.path;

    // if profile image is provided upload it to coludinary
    if (profileLocalPath) {
        const profileimage = await uploadOnCloudinary(profileLocalPath);

        if (profileimage) {
            req.body.profilepic = profileimage?.public_id;
            await deleteFromCloudinary(req.user?.profilepic ?? "");
        } else {
            throw new ApiError(500, "Something went wrong while uploading the cover image");
        }
    }

    // FIND THE USER BY THE USER ID AND UPDATE THE INFORMATION
    const user = await User.findByIdAndUpdate(req.user?._id, req.body, {
        new: true,
    }).select("-password -refreshToken -otp -otp_expiry");

    //  RETURN THE RESPONSE
    return res.status(200).json(new ApiResponse(200, user, "Account details updated sucessfully"));
});

// update user details
const updateUserBalance = asyncHandler(async (req, res) => {
    // FIND THE USER BY THE USER ID AND UPDATE THE INFORMATION
    const user = await User.findByIdAndUpdate(req.user?._id, { wallet_balance: req.body.amount }, { new: true }).select(
        "-password -refreshToken -otp -otp_expiry"
    );

    //  RETURN THE RESPONSE
    return res.status(200).json(new ApiResponse(200, user, "Account details updated sucessfully"));
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
    // Delete the user from db
    const deletedUser = await User.findByIdAndDelete(req.user?._id);

    // Throw error if video is not found
    if (!deletedUser) throw new ApiError(404, "User not found !!");

    // return response
    return res.status(200).json(new ApiResponse(200, {}, "User deleted sucessfully !!"));
});

export { getUser, updateUser, updateUserBalance, deleteUser };
