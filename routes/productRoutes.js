import express from "express";
import { searchProducts, getAllProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get("/search", searchProducts);
router.get("/data", getAllProducts);
router.get("/data/:id", getProductById);

export default router;
