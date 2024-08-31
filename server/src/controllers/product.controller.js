import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  deleteImageOnCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { generateExcelFile } from "../utils/generateExcelFile.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, price, category } = req.body;

  if (!price || !name || !category) {
    throw new ApiError(400, "All fields are required");
  }

  const productImageLocalPath = req.file.path;

  const image = await uploadOnCloudinary(productImageLocalPath);

  const product = await Product.create({
    name,
    price,
    category,
    image: image.url,
    image_publicId: image.public_id,
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
  const pageNo = Math.floor(req.query.pageNo || 0);
  const limit = Math.floor(req.query.limit || 10);

  if (pageNo < 0 || limit < 0) {
    throw new ApiError(400, "Invalid pageNo and limit");
  }

  const totalProducts = await Product.find({}).countDocuments();
  let skip = pageNo * limit;

  const totalPage = Math.ceil(totalProducts / limit);

  const products = await Product.find({}).skip(skip).limit(limit);

  if (!products || totalProducts < 0) {
    throw new ApiError(400, "No products found...");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Success", { products, totalProducts, totalPage })
    );
});

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  res.status(200).json(new ApiResponse(200, "Success", product));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(400, "Product not found");
  }

  const result = await deleteImageOnCloudinary(product.image_publicId);

  res.status(200).json(new ApiResponse(200, "Product deleted successfully..."));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  console.log(req.body);

  if (!price || !name || !category) {
    throw new ApiError(400, "All fields are required");
  }
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(400, "No product found");
  }

  if (req.file) {
    await deleteImageOnCloudinary(product.image_publicId);

    const imageLocalPath = req.file.path;

    const result = await uploadOnCloudinary(imageLocalPath);

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        image: result.url,
        image_publicId: result.public_id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("Inner", updateProduct);

    return res
      .status(200)
      .json(new ApiResponse(200, "Product updated sucessfully", updateProduct));
  }

  const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,

    runValidators: true,
  });

  if (!updateProduct) {
    throw new ApiError(400, "Error occur while updating...");
  }

  console.log("Outer", updateProduct);

  res
    .status(200)
    .json(new ApiResponse(200, "Product update successfully", updateProduct));
});

export const getProductsInExcelFile = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    throw new ApiError("400", "No products found");
  }

  const buffer = await generateExcelFile(products);

  res.setHeader("Content-Disposition", "attachment; filename=products.xlsx");
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.send(buffer);
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    throw new ApiError("400", "No Products found...");
  }

  res.status(200).json(new ApiResponse(200, "Success", products));
});



