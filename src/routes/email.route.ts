import { Router } from "express";
import * as EmailController from "../controllers/email.controller"

const router = Router();

router.post("/create-config", EmailController.saveEmailConfig);
router.post("/send-email", EmailController.sendEmailToUser)


export default router;