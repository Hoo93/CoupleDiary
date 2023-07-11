import { instance, mock, verify, when } from "ts-mockito";
import { BoardController } from "../../../src/Board/BoardController";
import { BoardService } from "../../../src/Board/BoardService";
import { CreateBoardDto } from "../../../src/Board/dto/createBoardDto";
import { UpdateBoardDto } from "../../../src/Board/dto/updateBoardDto";
import { deepEqual } from "assert";
import { Board } from "../../../src/Board/Board";
import exp = require("constants");
import { DeleteResult } from "typeorm";

describe("Board Controller Test", () => {

    let mockedService:BoardService;
    let boardController:BoardController;

    let userId:number = 2;
    let categoryId:number = 3;
    let title:string = "test board title";
    let content:string = "test board content";
    let isPublic:boolean = true;
    let now:Date = new Date();

    let createBoardDto:CreateBoardDto = new CreateBoardDto();
    createBoardDto.userId = userId;
    createBoardDto.categoryId = categoryId;
    createBoardDto.title = title;
    createBoardDto.content = content;
    createBoardDto.isPublic = isPublic;
    createBoardDto.createdAt = now;
    createBoardDto.updatedAt = now;

    const board = createBoardDto.toEntity()
    board.id = 1

    const updateBoardDto:UpdateBoardDto = new UpdateBoardDto();
    updateBoardDto.title = "update test title"
    updateBoardDto.content = "update test content"
    updateBoardDto.categoryId = 123
    
    beforeEach(() => {
        mockedService = mock(BoardService);
        boardController = new BoardController(instance(mockedService));
    })

    describe("createBoard method test", () => {

        it('should have a createBoard function', async () => {        
            expect(typeof boardController.createBoard).toBe('function')
        })

        it('should call boardService when createBoard', async () => {
            when(mockedService.createBoard(createBoardDto)).thenResolve(board)
    
            let boardController = new BoardController(instance(mockedService));
            const result = await boardController.createBoard(createBoardDto)
    
            verify(mockedService.createBoard(createBoardDto)).once()
            expect(result).toBe(board)
        })

    })

    describe("findById method test", () => {

        it('should have a findById function', async () => {        
            expect(typeof boardController.findById).toBe('function')
        })
    
        it('should call boardService when findById', async () => {
            
            when(mockedService.findById(board.id)).thenResolve(board)
    
            let boardController = new BoardController(instance(mockedService));
            
            const result = await boardController.findById(board.id)
    
            verify(mockedService.findById(board.id)).once()
            expect(result).toBe(board)
        })

    })

    describe("findAll method test", () => {

        it('should have a findAll function', async () => {        
            expect(typeof boardController.findAll).toBe('function')
        })
    
        it('should call boardService when findAll', async () => {
            const boards:Board[] = [board]
            
            when(mockedService.findAll()).thenResolve(boards)
            
            const result = await boardController.findAll()
    
            verify(mockedService.findAll()).once()
            expect(result).toBe(boards)
        })

    })

    describe("updateBoard method test", () => {

        it('should have a updateBoard function', async () => {        
            expect(typeof boardController.updateBoard).toBe('function')
        })

        it('should return updateBoard board.id' , async() => {
            when(mockedService.updateBoard(1,updateBoardDto)).thenResolve(1)

            const result = await boardController.updateBoard(1,updateBoardDto);
            
            verify(mockedService.updateBoard(1,updateBoardDto)).once()
            expect(result).toBe(1)
        })
    })

    describe("deleteBoard method test", () => {

        it('should have a deleteBoard function', async () => {        
            expect(typeof boardController.deleteBoard).toBe('function')
        })

        it('should return deleteResult', async () => {

            const deleteResult = new DeleteResult()

            when(mockedService.deleteBoard(board.id)).thenResolve(deleteResult)
            const result = await boardController.deleteBoard(board.id)

            verify(mockedService.deleteBoard(board.id)).once()
            expect(result).toBe(deleteResult)
        })
    })






})