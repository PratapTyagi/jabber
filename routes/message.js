import express from "express";

const router = express.Router();

import { createMessage, getMessage } from "../controllers/message.js";

import userAuthenticated from "../middlewares/userAuthenticated/userAuthenticated.js";

router.post("/sync", userAuthenticated, getMessage);
router.post("/new", userAuthenticated, createMessage);

export default router;
