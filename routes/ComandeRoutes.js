import express from 'express';

import multer   from 'multer';
import { addOnce, deleteone, getAll, DeletebyId,total,getbyid,changeEtat,getbyidcard,getShippingCarts
<<<<<<< Updated upstream
, getShippedAndReturnedCarts ,getPackingCarts , CardsBymonth}from "../controllers/ComandeController.js";

=======
, getShippedAndReturnedCarts,countLastWeekUsers,count ,getPackingCarts ,getMaxProductSales ,getProductSales }from "../controllers/ComandeController.js";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream

  
=======
  router.route('/lastweek').post(countLastWeekUsers);
  router.route('/lastweek2').post(count);
  router.route("/getMaxProductSales")
  .post(
    getMaxProductSales
  ); 
  router.route("/getProductSales")
  .post(
    getProductSales
  );
>>>>>>> Stashed changes
  export default router;