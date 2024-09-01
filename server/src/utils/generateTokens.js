import User from "../models/user.model.js";

export const generateAccessAndRefreshTokens = async (id) => {
  try {
    const user = await User.findById(id);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {}
};

export const options = {
  httpOnly: true,
  secure: true,
};
