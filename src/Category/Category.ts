import { Column, Entity, OneToMany, Unique } from "typeorm";
import { BaseTimeEntity } from "../entity/BaseTimeEntity";
import { Board } from "../Board/Board";

@Entity()
@Unique(['name'])
export class Category extends BaseTimeEntity {

    @Column()
    name:string;

    @OneToMany(() => Board,(boards) => boards.category)
    boards:Board[];

    static createCategory(name:string,now = new Date()) {
        const catergory = new Category();
        catergory.name = name;
        catergory.createdAt = now;
        catergory.updatedAt = now;
        return catergory;
    }
}