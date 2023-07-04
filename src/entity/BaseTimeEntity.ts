import { Code, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EssentialEntity {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    createdAt:string;

    @Column()
    updatedAt:string;
}