import { Tree } from "typeorm";
import { Comment } from "../../../src/Comment/Comment";


describe('Comment Entity test', () => {
    
    let comment:Comment;
    let userId:number;
    let boardId:number;
    let parentCommentId:number|null;
    let content:string;
    let now:Date = new Date();

    beforeEach( () => {
        userId = 1;
        boardId = 1;
        parentCommentId = null;
        content = "test content";

    })

    it('should return comment, parentCommentId default null', () => {
        comment = Comment.createComment(userId,boardId,content,now)
        
        expect(comment.userId).toBe(userId)
        expect(comment.boardId).toBe(boardId)
        expect(comment.content).toBe(content)
        expect(comment.createdAt).toBe(now)
        expect(comment.updatedAt).toBe(now)
        expect(comment.parentCommentId).toBe(null)
    })

    it('should return comment, parentCommentId 123', () => {
        parentCommentId = 123
        comment = Comment.createComment(userId,boardId,content,now,parentCommentId)
        
        expect(comment.userId).toBe(userId)
        expect(comment.boardId).toBe(boardId)
        expect(comment.content).toBe(content)
        expect(comment.createdAt).toBe(now)
        expect(comment.updatedAt).toBe(now)
        expect(comment.parentCommentId).toBe(123)
    })


})