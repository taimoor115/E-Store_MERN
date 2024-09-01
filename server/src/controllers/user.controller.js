import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  generateAccessAndRefreshTokens,
  options,
} from "../utils/generateTokens.js";

export const register = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required...");
  }

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new ApiError(400, "Email is already taken");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user.id).select("-password");

  if (!createdUser) {
    return new ApiError(400, "Somethings went wrong while creating user...");
  }

  res.status(201).json(
    new ApiResponse(201, "User created successfully...", {
      user: createdUser,
    })
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new ApiError(400, "Invalid email and password");
  }

  const matchedPassword = await existingUser.isPasswordCorrect(password);

  if (!matchedPassword) {
    throw new ApiError(400, "Invalid email and password");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
    existingUser._id
  );
  console.log("1", refreshToken);

  console.log("2", accessToken);

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)

    .json(
      new ApiResponse(200, "Login successfully...", {
        refreshToken,
        accessToken,
      })
    );
});

export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      refreshToken: undefined,
    },
  });

  res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "Logout successfully..."));
});
