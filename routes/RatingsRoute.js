import express from 'express';
import multer from '../middlewares/multer-config.js';
import { addOnce,getRatingsByProductId } from "../controllers/FeedbackController.js";
const router = express.Router();

router.route("/add").post(multer,addOnce);

router.route("/getRatings").post(multer,getRatingsByProductId);

export default router;