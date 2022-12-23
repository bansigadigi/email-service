export enum securityType {
    ssl = "ssl",
    tls = "tls",
    none = "none"
}

export const errorMessages = {
    NO_USER_FOUND: "no user found",
    NODEMAILER_CREATION_FAILED: "nodemailer creation failed",
    NODEMAILER_EMAIL_SENDING_FAILED: "nodemailer email sending failed",
    EMAIL_NOT_SENT: "email not sent",
    DAILY_EMAIL_LIMIT_REACHED: "daily email limit reached",
    USER_ID_MISSING: "please provide user id in request"
}

export const successMessages = {
    CONFIG_CREATION_SUCCESS: "config_creation_success",
    EMAIL_SUCCESSFULLY_SENT: "email successfully sent",
}