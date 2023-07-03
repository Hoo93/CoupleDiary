import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { EssentialEntity } from "./EssentialEntity";

@Entity()
export class User extends EssentialEntity{

    @Column()
    username:string;

    @Column()
    password:string;

}
