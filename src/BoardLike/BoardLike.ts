import { Column, Entity, ManyToOne } from "typeorm";
import { BaseTimeEntity } from "../entity/BaseTimeEntity";
import { User } from "../User/User";
import { Board } from "../Board/Board";

@Entity()
export class BoardLike extends BaseTimeEntity {

    @Column()
    userId:number;

    @Column()
    boardId:number;

    @ManyToOne(() => User, (user) => user.boardLikes)
    user:User;

    @ManyToOne(() => Board,(board) => board.boardLikes)
    board:Board;

    static createBoardLike (
        userId:number,
        boardId:number,
        now:Date):BoardLike {
            const boardLike = new BoardLike();
            boardLike.userId = userId,
            boardLike.boardId = boardId;
            boardLike.createdAt = now;
            boardLike.updatedAt = now;
            return boardLike
    }


}