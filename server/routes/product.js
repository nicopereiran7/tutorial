import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product.js";

const router = express.Router();

router.post('/create-product', createProduct);
router.get('/get-products', getProducts);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;