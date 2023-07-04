import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseTimeEntity } from "./BaseTimeEntity";

@Entity()
export class User extends BaseTimeEntity{

    @Column()
    username:string;

    @Column()
    password:string;

}
