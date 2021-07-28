import express from "express";

const router = express.Router();

import { createRoom, getRooms, getRoomWithId } from "../controllers/rooms.js";

router.get("/sync", getRooms);
router.get("/sync/:id", getRoomWithId);
router.post("/new", createRoom);

export default router;
