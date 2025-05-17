import express from "express";
import { searchProducts, getAllProducts, getProductById, getTags } from "../controllers/productController.js";

const router = express.Router();

router.get("/search", searchProducts);
router.get("/data", getAllProducts);
router.get("/data/:id", getProductById);
router.get("/tags",getTags);

export default router;
