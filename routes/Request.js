import express from 'express';
import {Update ,addOnce, DeletebyId, getAll} from "../controllers/RequestController.js";

const router = express.Router();

router.route("/addrequest")
    .post(
        addOnce
    );

router.route("/")
    .get(
        getAll
    );
router.route("/deleteid/:id").delete( DeletebyId);
router.route("/update").put( Update);


export default router;
