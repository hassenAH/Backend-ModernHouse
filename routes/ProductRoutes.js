import express from 'express';
import multer from '../middlewares/multer-config.js';
import { addOnce, putOnce, getAll, getOnce, DeletebyId, DeleteAll } from "../controllers/ProductController.js";

const router = express.Router();

router.route("/addproduct")
  .post(multer,
    addOnce
  );

router.route("/update/:id")
  .put(
    putOnce
  );
  router.route("/deleteall").delete( DeleteAll);
  router.route("/deleteid").delete( DeletebyId);
  router.route("/getid").get(getOnce);
  router.route("/getall")
    .get(getAll);
    
export default router;
