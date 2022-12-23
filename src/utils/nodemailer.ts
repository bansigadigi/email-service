import { errorMessages, securityType, successMessages } from "../constants/appConstants";
import { SendEmailInput } from "../interfaces/send-email";
import { User } from "../entity/user.entity";
import * as nodemailer from 'nodemailer'

let messages_sent = 0

export function createTransporter(userInfo: User) {
    try {
        const transporter = nodemailer.createTransport({
            pool: true,
            host: userInfo?.smtpConfig?.smtpHost,
            port: userInfo?.smtpConfig?.port,
            secure: true,
            auth: {
                user: userInfo?.userName,
                pass: userInfo?.password
            }
        })
        return transporter
    } catch (error) {
        console.log('error===========', error)
        throw new Error(errorMessages.NODEMAILER_CREATION_FAILED)
    }
}

export async function sendEmail(fromEmailId: string, payload: SendEmailInput, transporter: any, maxMessagesCount: number) {
    try {
        if (messages_sent > maxMessagesCount) throw new Error(errorMessages.DAILY_EMAIL_LIMIT_REACHED)
        const { to, subject, body } = payload
        const res = await transporter.sendMail({
            from: fromEmailId,
            to: to,
            subject: subject,
            text: body
        })
        messages_sent++
        return res && res?.response ? successMessages.EMAIL_SUCCESSFULLY_SENT : errorMessages.EMAIL_NOT_SENT
    } catch (error) {
        throw error
    }
}