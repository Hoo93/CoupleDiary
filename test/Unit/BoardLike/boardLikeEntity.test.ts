import { BoardLike } from "../../../src/BoardLike/BoardLike";

describe('boardLike Entity test', () => {
    
    let boardLike:BoardLike;
    let userId:number = 1;
    let boardId:number = 1;
    let now:Date = new Date();

    it('should return boardLike', () => {
        boardLike = BoardLike.createBoardLike(userId,boardId,now);
        
        expect(boardLike.userId).toBe(userId)
        expect(boardLike.boardId).toBe(boardId)
        expect(boardLike.createdAt).toBe(now)
        expect(boardLike.updatedAt).toBe(now)
    })

})