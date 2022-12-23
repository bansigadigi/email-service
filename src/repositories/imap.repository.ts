import { EntityRepository, Repository } from "typeorm";
import { ImapConfig } from "../entity/imap.entity";
import { SmtpConfig } from "../entity/smtp.entity";
import { ImapConfigInput, SmtpConfigInput, UserInput } from "../interfaces/create-email";

@EntityRepository(ImapConfig)
export class ImapRepository extends Repository<ImapConfig> {

    async createImap(imapConfig: ImapConfigInput): Promise<ImapConfig> {
        const imap = this.create({ imapHost: imapConfig.imapHost, port: imapConfig?.port, security: imapConfig?.security })
        return await this.save(imap)
    }

}