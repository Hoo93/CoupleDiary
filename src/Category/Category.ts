import { Column, Entity, Unique } from "typeorm";
import { BaseTimeEntity } from "../entity/BaseTimeEntity";

@Entity()
@Unique(['name'])
export class Category extends BaseTimeEntity {

    @Column()
    name:string;

    static createCategory(name:string,now = new Date()) {
        const catergory = new Category();
        catergory.name = name;
        catergory.createdAt = now;
        catergory.updatedAt = now;
        return catergory;
    }
}