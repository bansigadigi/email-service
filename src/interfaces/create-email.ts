import { securityType } from "../constants/appConstants"

export interface CreateEmailConfigInput {
    user: UserInput,
    smtpConfig: SmtpConfigInput,
    imapConfig: ImapConfigInput
}

export interface UserInput {
    name: string,
    fromEmailId: string,
    userName: string,
    password: string
}

export interface SmtpConfigInput {
    smtpHost: string,
    port: number
    security: securityType
    messagesPerDay: number
    timeGap?: number
}

export interface ImapConfigInput {
    imapHost: string,
    port: number,
    security: securityType
}