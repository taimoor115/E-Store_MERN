import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware.js/multer.middleware.js";

const router = express.Router();

router.route("/").post(upload.single("image"), createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getProduct/:id").get(getProduct);


export default router;
