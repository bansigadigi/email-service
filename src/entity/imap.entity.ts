import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { securityType } from "../constants/appConstants"
import { User } from "./user.entity"

@Entity()
export class ImapConfig {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    imapHost: string

    @Column()
    security: securityType

    @Column()
    port: number

    @OneToOne(() => User, user => user.imapConfig)
    @JoinColumn()
    user: User

}
