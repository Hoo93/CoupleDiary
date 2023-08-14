import { Column, Entity } from "typeorm";
import { BaseTimeEntity } from "../entity/BaseTimeEntity";
import { Board } from "../Board/Board";
import { Comment } from "../Comment/Comment";
import { CommentLike } from "../CommentLike/CommentLike";
import { BoardLike } from "../BoardLike/BoardLike";

@Entity()
export class Notice extends BaseTimeEntity {
    @Column()
    sendUserId: number;

    @Column()
    receiveUserId: number;

    @Column()
    noticeType: Comment | CommentLike | BoardLike;

    @Column({ default: true })
    isRead: boolean;

    @Column()
    readAt: Date;
}
