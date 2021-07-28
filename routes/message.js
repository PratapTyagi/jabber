import express from "express";

const router = express.Router();

import { createMessage, getMessage } from "../controllers/message.js";

router.get("/sync", getMessage);
router.post("/new", createMessage);

export default router;
