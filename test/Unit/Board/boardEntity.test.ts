import { Tree } from "typeorm";
import { Board } from "../../../src/Board/Board";


describe('Board Entity test', () => {
    
    let now:Date = new Date();
    let board:Board;
    let userId:number;
    let categoryId:number;
    let title:string;
    let content:string;
    let isPublic:boolean;

    beforeEach( () => {
        userId = 1;
        categoryId = 1;
        title = "test title";
        content = "test content";
        isPublic = true;
        board = Board.createBoard(userId,categoryId,title,content,isPublic,now)
        
    })

    it('Board.createBoard should return board', () => {
        expect(board.userId).toBe(userId)
        expect(board.categoryId).toBe(categoryId)
        expect(board.title).toBe(title)
        expect(board.content).toBe(content)
        expect(board.content).toBe(content)
        expect(board.isPublic).toBe(true)
        expect(board.createdAt).toBe(now)
        expect(board.updatedAt).toBe(now)
    })

    it('should return isPublc false, true', () => {
        board.setPrivate()
        expect(board.isPublic).toBe(false)

        board.setPublic()
        expect(board.isPublic).toBe(true)
    }) 

})