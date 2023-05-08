import express from 'express';

import { addOnce ,getAll} from "../controllers/ReclamationController.js";
const router = express.Router();

router.route("/add").post(addOnce);

router.route("/getallReclamation").get(getAll);


export default router;