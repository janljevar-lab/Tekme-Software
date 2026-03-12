import { Router } from "express";
import { 
    igralciSchema, 
    updateIgralec, 
    getAllIgralci, 
    getIgralecById, 
    deleteIgralec, 
    deleteAllIgralci,
    addTočke
 }
  from "../controllers/igralec.controller.js";

const router = Router();

router.route('/registracijaIgralca').post(igralciSchema);
router.route('/igralci/:id').put(updateIgralec);
router.route('/igralci/:id').delete(deleteIgralec);
router.route('/igralci').get(getAllIgralci);
router.route('/igralci/:id').get(getIgralecById);
router.route('/igralci').delete(deleteAllIgralci);
router.route('/igralci/:id').put(addTočke);
export default router;