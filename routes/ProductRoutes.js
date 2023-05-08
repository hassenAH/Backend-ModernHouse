import express from 'express';
import multer from '../middlewares/multer-config.js';
import { addOnce, putOnce, getAll, getOnce, DeletebyId, DeleteAll, getProductsByUserId,

  sortbyalpha,getProductsByCategory,sortbypriceasc,sortbypricedes,countLastsProduct ,getBestSellingProductsSupplier,getTotalSales,getTotalSalesbySupplier,getBestSellingProducts} from "../controllers/ProductController.js";


const router = express.Router();
router.route("/countLastsProduct")
  .get(
    countLastsProduct
  );
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
  router.route("/getTotalSalesbySupplier")
  .post(
    getTotalSalesbySupplier
  );
  router.route("/getBestSellingProducts")
  .post(
    getBestSellingProducts
  );
  router.route("/getBestSellingProductsSupplier")
  .post(
    getBestSellingProductsSupplier
  );
  
  
    
export default router;
