import { instance, mock, verify, when } from "ts-mockito";
import { DeleteResult } from "typeorm";
import { BoardLikeService } from "../../../src/BoardLike/BoardLikeService";
import { BoadrLikeController } from "../../../src/BoardLike/BoardLikeController";
import { CreateBoardLikeDto } from "../../../src/BoardLike/dto/createBoardLikeDto";
import { BoardLike } from "../../../src/BoardLike/BoardLike";

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

        it('should call boardLikeService when createBoardLike', async () => {
            when(mockedService.createBoardLike(createBoardLikeDto)).thenResolve(boardLike)
    
            let boardLikeController = new BoadrLikeController(instance(mockedService));
            const result = await boardLikeController.createBoardLike(createBoardLikeDto)
    
            verify(mockedService.createBoardLike(createBoardLikeDto)).once()
            expect(result).toBe(boardLike)
        })

    })

    describe("findById method test", () => {

        it('should have a findById function', async () => {        
            expect(typeof boardLikeController.findById).toBe('function')
        })
    
        it('should call boardService when findById', async () => {
            
            when(mockedService.findById(boardLike.id)).thenResolve(boardLike)
    
            const result = await boardLikeController.findById(boardLike.id)
    
            verify(mockedService.findById(boardLike.id)).once()
            expect(result).toBe(boardLike)
        })

    })

    describe("findAll method test", () => {

        it('should have a findAll function', async () => {        
            expect(typeof boardLikeController.findAll).toBe('function')
        })
    
        it('should call boardLikeService when findAll', async () => {
            const boardLikes:BoardLike[] = [boardLike]
            
            when(mockedService.findAll()).thenResolve(boardLikes)
            
            const result = await boardLikeController.findAll()
    
            verify(mockedService.findAll()).once()
            expect(result).toBe(boardLikes)
        })

    })

    describe("deleteBoardLike method test", () => {

        it('should have a deleteBoardLike function', async () => {        
            expect(typeof boardLikeController.deleteBoardLike).toBe('function')
        })

        it('should return deleteResult', async () => {

            const deleteResult = new DeleteResult()

            when(mockedService.deleteBoardLike(boardLike.id)).thenResolve(deleteResult)
            const result = await boardLikeController.deleteBoardLike(boardLike.id)

            verify(mockedService.deleteBoardLike(boardLike.id)).once()
            expect(result).toBe(deleteResult)
        })
    })



})