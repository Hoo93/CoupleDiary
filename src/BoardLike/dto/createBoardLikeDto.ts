import { IsInt, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { BaseTimeEntity } from "../../entity/BaseTimeEntity";
import { BoardLike } from "../BoardLike";

export class CreateBoardLikeDto extends BaseTimeEntity {
    
    @IsNotEmpty()
    @IsInt()
    userId:number;
    
    @IsNotEmpty()
    @IsInt()
    boardId:number;

    public toEntity(now:Date = new Date()) {
        return BoardLike.createBoardLike(
            this.userId,
            this.boardId,
            now)
    }


}