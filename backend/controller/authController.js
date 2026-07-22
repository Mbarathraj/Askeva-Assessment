import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { Admin } from "../models/admin.js";

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = jwt.sign(
        {
            id: admin._id,
            email: admin.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m",
        }
    );

    const refreshToken = jwt.sign(
        {
            id: admin._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ?"none":"strict",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:  process.env.NODE_ENV === "production" ?"none":"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
        },
    });
});


export const logout = asyncHandler(async (req, res) => {
    res
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:  process.env.NODE_ENV === "production" ?"none":"strict",
        })
        .clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ?"none":"strict",
        })
        .status(200)
        .json({
            success: true,
            message: "Logged out successfully",
        });
});


export const getProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user.id).select("-password");

    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found",
        });
    }

    return res.status(200).json({
        success: true,
        user: admin,
    });
});