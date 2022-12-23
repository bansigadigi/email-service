import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import { ImapConfig } from "./imap.entity"
import { SmtpConfig } from "./smtp.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    fromEmailId: string

    @Column()
    userName: string

    @Column()
    password: string

    @OneToOne(() => SmtpConfig, smtpConfig => smtpConfig.user)
    smtpConfig: SmtpConfig

    @OneToOne(() => ImapConfig, imapConfig => imapConfig.user)
    imapConfig: ImapConfig

}
