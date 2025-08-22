import { asyncHandler } from "../Utils/asyncHandler";

// register
const registerUser = asyncHandler(async (req, res) => {});

// login
const loginUser = asyncHandler(async (req, res) => {});

// send OTP
const sendOTP = asyncHandler(async (req, res) => {});

// verify OTP
const verifyOTP = asyncHandler(async (req, res) => {});

// refresh accesstoken
const refreshAccessToken = asyncHandler(async (req, res) => {});

// change password
const changePassword = asyncHandler(async (req, res) => {});

// logout
const logoutUser = asyncHandler(async (req, res) => {});

// get user details
const getUser = asyncHandler(async (req, res) => {});

// update user details
const updateUser = asyncHandler(async (req, res) => {});

// delete user
const deleteUser = asyncHandler(async (req, res) => {});

export {
    registerUser,
    loginUser,
    sendOTP,
    verifyOTP,
    refreshAccessToken,
    changePassword,
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
};
