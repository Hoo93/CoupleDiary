import { Column, Entity, Unique } from "typeorm";
import { BaseTimeEntity } from "../entity/BaseTimeEntity";

@Entity()
@Unique(['name'])
export class Category extends BaseTimeEntity {

    @Column()
    name:string;
}