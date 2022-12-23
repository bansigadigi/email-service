import { EntityRepository, Repository } from "typeorm";
import { ImapConfig } from "../entity/imap.entity";
import { SmtpConfig } from "../entity/smtp.entity";
import { User } from "../entity/user.entity";
import { UserInput } from "../interfaces/create-email";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createEmailConfig(user: UserInput, smtpConfig: SmtpConfig, imapConfig: ImapConfig): Promise<User> {
        const userInfo = this.create({ name: user?.name, fromEmailId: user?.fromEmailId, userName: user?.userName, password: user?.password })
        userInfo.smtpConfig = smtpConfig
        userInfo.imapConfig = imapConfig
        return await this.save(userInfo)
    }

    async fetchUserInfoWithRelations(userId: number): Promise<User> {
        return await this.findOne(userId,{
            relations: ['smtpConfig','imapConfig']
        })
    }

}