import { BaseTimeEntity } from "../../entity/BaseTimeEntity";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, MinLength, min } from "class-validator";
import { Comment } from "../Comment";

export class UpdateCommentDto extends BaseTimeEntity {
    
    @IsOptional()
    @IsNotEmpty()
    @MinLength(1,{message:'comment content should be longer than 1'})
    content:string;

    public commentUpdateInfo(now:Date = new Date()) {
        const commentUpdateInfo = {
            content:this.content,
            updatedAt:now
        }
        return commentUpdateInfo
    }

}