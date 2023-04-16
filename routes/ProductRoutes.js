import express from 'express';
import multer from '../middlewares/multer-config.js';
import { addOnce, putOnce, getAll, getOnce, DeletebyId, DeleteAll, getProductsByUserId,
  sortbyalpha,getTotalSales,getProductsByCategory,sortbypriceasc,sortbypricedes } from "../controllers/ProductController.js";

const router = express.Router();

router.route("/addproduct")
  .post(
    addOnce
  );
router.route("/getuserproduct")
  .post(
    getProductsByUserId
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
  router.route("/getbycategory")
    .post(
      getProductsByCategory
    );
    router.route("/sortbyalpha")
    .get(
      sortbyalpha
    );
    router.route("/priceasc")
    .get(
      sortbypriceasc
    );
    router.route("/pricedec")
    .get(
      sortbypricedes
    );
    
    router.route("/getTotalSales")
  .post(
    getTotalSales
  );
    
export default router;
