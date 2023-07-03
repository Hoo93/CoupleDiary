import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity{

}
