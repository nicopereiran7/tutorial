import { signUp, signIn } from "../controllers/user.js";

import express from "express";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

export default router;
