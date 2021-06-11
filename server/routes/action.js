import express from "express";
import { createAction, getActions } from "../controllers/action.js";

const router = express.Router();

//localhost:port/api/action/create-action
router.post('/create-action', createAction);
router.get('/get-actions', getActions);

export default router;