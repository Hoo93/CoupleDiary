import { Column, Entity, ManyToOne } from "typeorm";
import { BaseTimeEntity } from "../entity/BaseTimeEntity";
import { User } from "../User/User";
import { Board } from "../Board/Board";
import { IsOptional } from "class-validator";

@Entity()
export class Comment extends BaseTimeEntity {

    @Column()
    userId:number;

    @Column()
    boardId:number;

    @IsOptional()
    @Column({default:null})
    parentCommentId:number|null;

    @Column()
    content:string;

    @ManyToOne(() => User, (user) => user.boards)
    user:User;

    @ManyToOne(() => Board,(board) => board.comments)
    board:Board;

    static createComment (
        userId:number,
        boardId:number,
        content:string,
        now:Date,
        parentCommentId:number|null = null):Comment {
            const comment = new Comment();
            comment.userId = userId,
            comment.boardId = boardId;
            comment.parentCommentId = parentCommentId;
            comment.content = content;
            comment.createdAt = now;
            comment.updatedAt = now;
            return comment
    }


}