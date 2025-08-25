import { Document, Types } from "mongoose";

export type Gender = "male" | "female" | "other";

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    surname: string;
    email: string;
    password: string;
    profilepic?: string;
    phonenumber: string;
    gender: Gender;
    dob: Date;
    wallet_balance: number;
    refreshToken?: string;
    otp?: string;
    otp_expiry?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserMethods {
    isPasswordCorrect(password: string): Promise<boolean>;
    isOtpCorrect(otp: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
    generateAccessAndRefreshTokens(): Promise<{ accessToken: string; refreshToken: string }>;
}

export type IUserDocument = Document & IUser & IUserMethods;

export type LeanUser = Omit<IUser, "password" | "otp" | "refreshToken">;
