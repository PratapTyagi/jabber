import express from "express";

const router = express.Router();

import { createRoom, getRooms, getRoomWithId } from "../controllers/rooms.js";

import userAuthenticated from "../middlewares/userAuthenticated/userAuthenticated.js";

router.get("/sync", userAuthenticated, getRooms);
router.get("/sync/:id", userAuthenticated, getRoomWithId);
router.post("/new", userAuthenticated, createRoom);

export default router;
