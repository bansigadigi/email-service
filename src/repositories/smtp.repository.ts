import { EntityRepository, Repository } from "typeorm";
import { SmtpConfig } from "../entity/smtp.entity";
import { ImapConfigInput, SmtpConfigInput, UserInput } from "../interfaces/create-email";

@EntityRepository(SmtpConfig)
export class SmtpRepository extends Repository<SmtpConfig> {

    async createSmtp(smtpConfig: SmtpConfigInput): Promise<SmtpConfig> {
        const smtp = this.create({ smtpHost: smtpConfig?.smtpHost, port: smtpConfig?.port, security: smtpConfig?.security, messagesPerDay: smtpConfig?.messagesPerDay })
        return await this.save(smtp)
    }

}