import express from "express";
import { refreshAccessToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/refresh-access-token", refreshAccessToken);

export default router;
