import { BaseTimeEntity } from "../../entity/BaseTimeEntity";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, MinLength, min } from "class-validator";
import { Comment } from "../Comment";

export class CreateCommentDto extends BaseTimeEntity {
    
    @IsNotEmpty()
    @IsInt()
    userId:number;
    
    @IsNotEmpty()
    @IsInt()
    boardId:number;

    @IsOptional()
    parentCommentID:number|null;

    @IsNotEmpty()
    @MinLength(1,{message:'comment content should be longer than 1'})
    content:string;

    public toEntity(now:Date = new Date()) {
        return Comment.createComment(
            this.userId,
            this.boardId,
            this.content,
            now,
            this.parentCommentID)
    }


}