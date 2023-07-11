import { instance, mock, verify, when } from "ts-mockito";
import { Board } from "../../../src/Board/Board";
import { DeleteResult } from "typeorm";
import { BoardLikeService } from "../../../src/BoardLike/BoardLikeService";
import { BoadrLikeController } from "../../../src/BoardLike/BoardLikeController";
import { CreateBoardLikeDto } from "../../../src/BoardLike/dto/createBoardLikeDto";

describe("BoardLike Controller Test", () => {

    let mockedService:BoardLikeService;
    let boardLikeController:BoadrLikeController;

    let userId:number = 2;
    let boardId:number = 3;
    let now:Date = new Date();

    let createBoardLikeDto:CreateBoardLikeDto = new CreateBoardLikeDto();
    createBoardLikeDto.userId = userId;
    createBoardLikeDto.boardId = boardId;
    createBoardLikeDto.createdAt = now;
    createBoardLikeDto.updatedAt = now;

    const boardLike = createBoardLikeDto.toEntity()
    boardLike.id = 1
    
    beforeEach(() => {
        mockedService = mock(BoardLikeService);
        boardLikeController = new BoadrLikeController(instance(mockedService));
    })

    describe("createBoardLike method test", () => {

        it('should have a createBoardLike function', async () => {        
            expect(typeof boardLikeController.createBoardLike).toBe('function')
        })

        it('should callLike boardService when createBoardLike', async () => {
            when(mockedService.createBoardLike(createBoardLikeDto)).thenResolve(boardLike)
    
            let boardLikeController = new BoadrLikeController(instance(mockedService));
            const result = await boardLikeController.createBoardLike(createBoardLikeDto)
    
            verify(mockedService.createBoardLike(createBoardLikeDto)).once()
            expect(result).toBe(boardLike)
        })

    })

    
})