import express from "express";

const router = express.Router();

import {
  registerUser,
  loginUser,
  getAllUsers,
  addUser,
} from "../controllers/users.js";

import userAuthenticated from "../middlewares/userAuthenticated/userAuthenticated.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/allusers", userAuthenticated, getAllUsers);
router.post("/adduser", userAuthenticated, addUser);

export default router;
