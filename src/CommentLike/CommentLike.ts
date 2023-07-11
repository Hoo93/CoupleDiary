import { Column, Entity, ManyToOne } from "typeorm";
import { BaseTimeEntity } from "../entity/BaseTimeEntity";
import { User } from "../User/User";
import { Comment } from "../Comment/Comment";

@Entity()
export class CommentLike extends BaseTimeEntity {

    @Column()
    userId:number;

    @Column()
    commentId:number;

    @ManyToOne(() => User, (user) => user.commentLikes)
    user:User;

    @ManyToOne(() => Comment,(comment) => comment.commentLikes)
    comment:Comment;

    static createCommentLike (
        userId:number,
        commentId:number,
        now:Date):CommentLike {
            const commentLike = new CommentLike();
            commentLike.userId = userId,
            commentLike.commentId = commentId;
            commentLike.createdAt = now;
            commentLike.updatedAt = now;
            return commentLike
    }


}