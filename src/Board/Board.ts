import { Column, Entity, ManyToOne } from "typeorm";
import { BaseTimeEntity } from "../entity/BaseTimeEntity";
import { User } from "../User/User";
import { Category } from "../Category/Category";

@Entity()
export class Board extends BaseTimeEntity {

    @Column()
    title:string;

    @Column()
    password:string;

    @Column()
    context:string;

    @Column()
    nickname:string;

    @Column()
    userId:number;

    @Column()
    categoryId:number;

    @ManyToOne(() => User, (user) => user.boards)
    user:User;

    @ManyToOne(() => Category,(category) => category.boards)
    category:Category;


}