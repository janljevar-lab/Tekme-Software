import { Router } from "express";
import { igralciSchema } from "../controllers/igralec.controller.js";

const router = Router();

router.route('/registracijaIgralca').post(igralciSchema);
export default router;