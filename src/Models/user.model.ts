import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        surname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        profilepic: {
            type: String,
        },
        phonenumber: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            enum: ["male", "female", "other"],
        },
        dob: {
            type: Date,
            required: true,
            trim: true,
        },
        wallet_balance: {
            type: Number,
            default: 0,
        },
        refreshToken: {
            type: String,
        },
        otp: {
            type: String,
            trim: true,
        },
        otp_expiry: {
            type: Date,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    if (this.isModified("otp") && this.otp) {
        this.otp = await bcrypt.hash(this.otp, 10);
    }

    next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.isOtpCorrect = async function (otp: string) {
    if (!this.otp) return false;

    const isValid = await bcrypt.compare(otp, this.otp);
    const isExpired = this.otp_expiry && Date.now() > this.otp_expiry;

    return isValid && !isExpired;
};

userSchema.methods.generateAccessToken = function () {
    const secret = process.env.ACCESS_TOKEN_SECRET as jwt.Secret | undefined;
    if (!secret) throw new Error("ACCESS_TOKEN_SECRET is not defined");

    const options: jwt.SignOptions = {};
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRY;
    if (expiresIn)
        options.expiresIn = expiresIn as jwt.SignOptions["expiresIn"];

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        secret,
        options
    );
};

userSchema.methods.generateRefreshToken = function () {
    const secret = process.env.REFRESH_TOKEN_SECRET as jwt.Secret | undefined;
    if (!secret) throw new Error("REFRESH_TOKEN_SECRET is not defined");

    const options: jwt.SignOptions = {};
    const expiresIn = process.env.REFRESH_TOKEN_EXPIRY;
    if (expiresIn)
        options.expiresIn = expiresIn as jwt.SignOptions["expiresIn"];

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        secret,
        options
    );
};

export const User = mongoose.model("User", userSchema);
