import { IsInt, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { BaseTimeEntity } from "../../entity/BaseTimeEntity";
import { CommentLike } from "../CommentLike";

export class CreateCommentLikeDto extends BaseTimeEntity {
    
    @IsNotEmpty()
    @IsInt()
    userId:number;
    
    @IsNotEmpty()
    @IsInt()
    commentId:number;

    public toEntity(now:Date = new Date()) {
        return CommentLike.createCommentLike(
            this.userId,
            this.commentId,
            now)
    }


}