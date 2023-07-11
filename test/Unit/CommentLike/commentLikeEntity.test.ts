import { CommentLike } from "../../../src/CommentLike/CommentLike";

describe('commentLike Entity test', () => {
    
    let commentLike:CommentLike;
    let userId:number = 1;
    let commentId:number = 1;
    let now:Date = new Date();

    it('should return commentLike', () => {
        commentLike = CommentLike.createCommentLike(userId,commentId,now);
        
        expect(commentLike.userId).toBe(userId)
        expect(commentLike.commentId).toBe(commentId)
        expect(commentLike.createdAt).toBe(now)
        expect(commentLike.updatedAt).toBe(now)
    })

})