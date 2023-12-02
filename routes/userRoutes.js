import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
