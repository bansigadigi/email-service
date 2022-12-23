import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { securityType } from "../constants/appConstants"
import { User } from "./user.entity"

@Entity()
export class SmtpConfig {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    smtpHost: string

    @Column()
    security: securityType

    @Column()
    port: number

    @Column()
    messagesPerDay: number

    @Column({ nullable: true })
    timeGap: number

    @OneToOne(() => User, user => user.smtpConfig)
    @JoinColumn()
    user: User

}
