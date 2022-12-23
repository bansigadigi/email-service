import { getCustomRepository } from "typeorm";
import { errorMessages } from "../constants/appConstants";
import { ImapConfig } from "../entity/imap.entity";
import { SmtpConfig } from "../entity/smtp.entity";
import { User } from "../entity/user.entity";
import { ImapConfigInput, SmtpConfigInput, UserInput } from "../interfaces/create-email";
import { SendEmailInput } from "../interfaces/send-email";
import { ImapRepository } from "../repositories/imap.repository";
import { SmtpRepository } from "../repositories/smtp.repository";
import { UserRepository } from "../repositories/user.repository";
import { createTransporter, sendEmail } from "../utils/nodemailer";

export async function createEmailConfig(user: UserInput, smtpConfig: SmtpConfigInput, imapConfig: ImapConfigInput) {
    try {
        const smtpRepo = getCustomRepository(SmtpRepository)
        const userRepo = getCustomRepository(UserRepository)
        const imapRepo = getCustomRepository(ImapRepository)
        const smtp: SmtpConfig = await smtpRepo.createSmtp(smtpConfig)
        const imap: ImapConfig = await imapRepo.createImap(imapConfig)
        const userInfo = await userRepo.createEmailConfig(user, smtp, imap)
        return userInfo
    } catch (error) {
        throw error
    }
}

export async function triggerEmailToUser(payload: SendEmailInput) {
    try {
        if(!payload?.userId) throw new Error(errorMessages.USER_ID_MISSING)
        const userRepo = getCustomRepository(UserRepository)
        const userInfo: User = await userRepo.fetchUserInfoWithRelations(payload?.userId)
        if(!userInfo) throw new Error(errorMessages?.NO_USER_FOUND)
        const transporter = createTransporter(userInfo)
        const info = await sendEmail(userInfo?.fromEmailId, payload, transporter, userInfo?.smtpConfig?.messagesPerDay)
        return info
    } catch (error) {
        throw error
    }
}