import express from 'express';
import multer   from 'multer';
import { addOnce, deleteone, getAll, DeletebyId,total,getbyid,changeEtat  }from "../controllers/ComandeController.js";

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
  .post(
    getAll
  );
   router.route("/getid")
  .post(
    getbyid
  ); 
  router.route("/changeetat/:id/:etat")
  .post(
    changeEtat
  ); 
  export default router;