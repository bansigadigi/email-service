import { Request, Response } from "express";
import { successMessages } from "../constants/appConstants";
import { CreateEmailConfigInput } from "../interfaces/create-email";
import { SendEmailInput } from "../interfaces/send-email";
import { createEmailConfig, triggerEmailToUser } from "../services/email.services";

export async function saveEmailConfig(req: Request, res: Response) {
    try {
        const params: CreateEmailConfigInput = req.body;
        const { user, smtpConfig, imapConfig } = params
        await createEmailConfig(user, smtpConfig, imapConfig)
        res.status(200).json({
            message: successMessages.CONFIG_CREATION_SUCCESS,
            error: ""
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

export async function sendEmailToUser(req: Request, res: Response) {
    try {
       const reqBody: SendEmailInput = req?.body
       const result = await triggerEmailToUser(reqBody)
       res.status(200).json({
          message:result
       })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}