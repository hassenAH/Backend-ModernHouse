import express from 'express';

import multer   from 'multer';
import { addOnce, deleteone, getAll, DeletebyId,total,getbyid,changeEtat,getbyidcard,getShippingCarts
, getShippedAndReturnedCarts ,getPackingCarts }from "../controllers/ComandeController.js";


const router = express.Router();
router.route("/CardsBymonth")
  .get(
    CardsBymonth
  );
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
  router.route("/getbyidcard/:_id")
  .post(
    getbyidcard
  ); 
  router.route("/changeetat/:_id/:etat")
  .post(
    changeEtat
  ); 
  router.route("/getShippingCarts")
  .post(
    getShippingCarts
  ); 
  router.route("/getPackingCarts")
  .post(
    getPackingCarts
  );
  
  router.route("/getShippedAndReturnedCarts")
  .post(
    getShippedAndReturnedCarts
  ); 

  
  export default router;