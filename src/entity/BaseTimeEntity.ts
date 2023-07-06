import { Code, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseTimeEntity {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    createdAt:Date;

    @Column()
    updatedAt:Date;
}