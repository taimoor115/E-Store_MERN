import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, price, category } = req.body;
  if ([name, price, category].some((field) => field?.trim() == "")) {
    throw new ApiError(400, "All fields are required ");
  }

  const productImageLocalPath = req.file.path;

  const image = await uploadOnCloudinary(productImageLocalPath);

  const product = await Product.create({
    name,
    price,
    category,
    image: image.url,
  });

  if (!product) {
    throw new ApiError(400, "Error occur while creating the product...");
  }

  console.log(product);

  res
    .status(201)
    .json(new ApiResponse(201, "Product created successfully....", product));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const pageNo = Math.floor(req.query.page || 0);
  const limit = Math.floor(req.query.limit || 10);

  if (pageNo < 0 || limit < 0) {
    throw new ApiError(400, "Invalid pageNo and limit");
  }

  const totalProducts = await Product.find({}).countDocuments();
  let skip = pageNo * limit;

  const products = await Product.find({}).skip(skip).limit(limit);

  if (!products || totalProducts < 0) {
    throw new ApiError(400, "No products found...");
  }

  res.status(200).json(new ApiResponse(200, "Success", products));
});
