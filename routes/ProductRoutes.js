import express from 'express';
import multer from '../middlewares/multer-config.js';

import { addOnce, putOnce, getAll, getOnce, DeletebyId, DeleteAll, addWish, deletewish, getwishList, getwishbyid } from "../controllers/ProductController.js";

import { addOnce, putOnce, getAll, getOnce, DeletebyId, DeleteAll, addWish, deletewish, getwishList,
   getwishbyid, getProductsByCategory, sortbyalpha, sortpriceasc, sortpriceades } from "../controllers/ProductController.js";


const router = express.Router();

router.route("/addproduct")
  .post(multer,
    addOnce
  );

  router.route("/addwish")
  .post(
    addWish
  );
  router.route("/deletewish")
  .delete(
    deletewish
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
    
  router.route("/getwishlists")
    .get(getwishList);


    router.route("/getwishid")
    .get(
      getwishbyid
    ); 
  router.route("/getwishid")
    .get(
      getwishbyid
    ); 
  router.route('/getbycategory').get(getProductsByCategory);
  router.route('/sortalpha').get(sortbyalpha);
  router.route('/priceasc').get(sortpriceasc);
  router.route('/pricedec').get(sortpriceades);
export default router;
