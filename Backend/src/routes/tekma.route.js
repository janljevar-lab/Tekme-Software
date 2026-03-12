import { Router } from "express";
import {
     createTekma, 
     getAllTekme, 
     getByPlayer, 
     deleteAllTekma, 
     deleteTekma, 
     updateTekma  
    } from "../controllers/tekma.controller.js";

const router = Router();

router.route('/create').post(createTekma);
router.route('/all').get(getAllTekme);
router.route('/player/:playerId').get(getByPlayer);
router.route('/:id').delete(deleteTekma);
router.route('/:id').put(updateTekma);
router.route('/delete-all').delete(deleteAllTekma);
export default router;
