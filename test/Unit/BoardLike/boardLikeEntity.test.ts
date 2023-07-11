import { Tree } from "typeorm";
import { BoardLike } from "../../../src/BoardLike/BoardLike";

describe('boardLike Entity test', () => {
    
    let boardLike:BoardLike;
    let userId:number;
    let boardId:number;
    let now:Date = new Date();

    beforeEach( () => {
        userId = 1;
        boardId = 1;
    })

    it('should return boardLike, parentboardLikeId default null', () => {
        boardLike = BoardLike.createBoardLike(userId,boardId,now);
        
        expect(boardLike.userId).toBe(userId)
        expect(boardLike.boardId).toBe(boardId)
        expect(boardLike.createdAt).toBe(now)
        expect(boardLike.updatedAt).toBe(now)
    })

})