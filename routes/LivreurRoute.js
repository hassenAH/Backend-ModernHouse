import express from 'express';
import multer   from 'multer';
import { addOnce, DeletebyId,total,getbyid,changeEtat,getbyidcard,getShippingCarts
, getShippedAndReturnedCarts ,getPackingCarts,getbyidShipped,getbyidReturned
,getbyidArchived }from "../controllers/LivreurController.js";

const router = express.Router();

router.route("/addLivraison/:idcart/:idUser")
  .post(
    addOnce
  );
  router.route("/delete")
  .delete(
    DeletebyId
  );
  router.route("/total")
  .get(
    total
  ); 

   router.route("/getid")
  .post(
    getbyid
  ); 
  router.route("/getbyidShipped")
  .post(
    getbyidShipped
  ); 
  router.route("/getbyidReturned")
  .post(
    getbyidReturned
  ); 
  router.route("/getbyidArchived")
  .post(
    getbyidArchived
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