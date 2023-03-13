import express from 'express';
import { Pay,webhook } from "../controllers/PaymentController.js";
const router = express.Router();

router.route("/Pay")
    .post(
        Pay
    );
router.route("/webhook").post(webhook);
export default router;