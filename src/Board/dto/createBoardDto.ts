import { Column } from "typeorm";
import { BaseTimeEntity } from "../../entity/BaseTimeEntity";
import { IsBoolean, IsInt, IsNotEmpty, MinLength, min } from "class-validator";
import { Board } from "../Board";

export class CreateBoardDto extends BaseTimeEntity {
    
    @IsNotEmpty()
    @IsInt()
    userId:number;
    
    @IsNotEmpty()
    @IsInt()
    categoryId:number;

    @IsNotEmpty()
    @MinLength(1,{message:'board title should be longer than 1'})
    title:string;

    @IsNotEmpty()
    @MinLength(1,{message:'board title should be longer than 1'})
    content:string;

    @IsNotEmpty()
    @IsBoolean()
    isPublic:boolean;

    public toEntity(now:Date = new Date()) {
        return Board.createBoard(
            this.userId,
            this.categoryId,
            this.title,
            this.content,
            this.isPublic,
            now)
    }


}