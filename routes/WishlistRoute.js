import express from 'express';
import multer from '../middlewares/multer-config.js';


import {addWish, deletewish, getwishList,
   getwishbyid } from "../controllers/WishlistController.js";


const router = express.Router();

  router.route("/getwishlists")
    .get(getwishList);


    router.route("/getwishid")
    .post(
      getwishbyid
    ); 
    router.route("/addwish")
    .post(
      addWish
    );
    router.route("/deletewish")
  .delete(
    deletewish
  );

export default router;
