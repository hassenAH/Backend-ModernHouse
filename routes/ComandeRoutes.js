import express from 'express';
import multer   from 'multer';
import { addOnce, deleteone, getAll, DeletebyId,total,getbyid  }from "../controllers/ComandeController.js";

const router = express.Router();

router.route("/addcomande")
  .post(
    addOnce
  );
router.route("/deleteProduct")
  .delete(
    deleteone
  );
  router.route("/delete")
  .delete(
    DeletebyId
  );
  router.route("/total")
  .get(
    total
  ); 
  router.route("/getall")
  .get(
    getAll
  );
   router.route("/getid")
  .get(
    getbyid
  ); 

  export default router;