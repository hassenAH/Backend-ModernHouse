import express from 'express';
import multer from '../middlewares/multer-config.js';
import { addOnce, putOnce, getAll, getOnce, DeletebyId, DeleteAll, getPositionByUserId,} from "../controllers/PositionController.js";


const router = express.Router();

router.route("/addposition")
  .post(
    addOnce
  );
router.route("/getuserposition")
  .post(
    getPositionByUserId
  );

router.route("/update/:id")
  .put(
    putOnce
  );
  router.route("/deleteall").delete( DeleteAll);
  router.route("/deleteid/:id").delete( DeletebyId);
  router.route("/getid").get(getOnce);
  router.route("/getall")
    .get(getAll);
 
  
  
    
export default router;
