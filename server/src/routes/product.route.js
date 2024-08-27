import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductsInExcelFile,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware.js/multer.middleware.js";

const router = express.Router();

router.route("/").post(upload.single("image"), createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getProduct/:id").get(getProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);
router.route("/:id").patch(upload.single("image"), updateProduct);
router.get("/export/excel", getProductsInExcelFile);


export default router;
