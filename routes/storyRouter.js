import express from "express";
import {
  createStory,
  deleteStory,
  getStories,
  getStory,
  updateStory,
} from "../controllers/storyController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const fileStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        "-" +
        file.originalname
    );
  },
});
const upload = multer({ storage: fileStorage });

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  createStory
);
// router.post("/", upload.single("image"), createStory);
router.get("/", getStories);
router.get("/:id", getStory);
router.patch("/:id", updateStory);
router.delete("/:id", deleteStory);

export default router;
