import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (accessToken) {
      try {
        const decoded = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET
        );

        req.user = decoded;
        return next();
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired session",
        });
      }
    }

    // 2. Verify Refresh Token
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const admin = await Admin.findById(decodedRefresh.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const newAccessToken = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    req.user = {
      id: admin._id,
      email: admin.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session",
    });
  }
};


