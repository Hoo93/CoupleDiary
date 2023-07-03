import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity{

    @Column()
    username:string;

    @Column()
    password:string;

}
