import express from "express";
import {
  createStory,
  deleteStory,
  getStories,
  getStory,
  updateStory,
} from "../controllers/storyController.js";

const router = express.Router();

router.post("/", createStory);
router.get("/", getStories);
router.get("/:id", getStory);
router.patch("/:id", updateStory);
router.delete("/:id", deleteStory);

export default router;
