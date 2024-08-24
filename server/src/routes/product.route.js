import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
import { upload } from "../middleware.js/multer.middleware.js";

const router = express.Router();

router.route("/").post(upload.single("image"), createProduct);
router.route("/getAllProducts").get(getAllProducts);

export default router;
