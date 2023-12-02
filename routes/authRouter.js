import express from "express";

import { Auth } from "../controllers/authController.js";

const router = express.Router();

router.post("/", Auth);

export default router;
