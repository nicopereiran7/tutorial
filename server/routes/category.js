import express from "express";
import { createCategory, getCategories } from "../controllers/category.js";

const router = express.Router();

router.post('/create-category', createCategory);
router.get('/get-categories', getCategories);

export default router;