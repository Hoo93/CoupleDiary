import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { Board } from "../../../src/Board/Board";
import { BoardRepository } from "../../../src/Board/BoardRepository";
import { BoardController } from "../../../src/Board/boardController";
import { BoardService } from "../../../src/Board/boardService";
import { CreateBoardDto } from "../../../src/Board/dto/createBoardDto";


describe('Board Service Test', () => {
    let mockedRepository:BoardRepository;
    let boardService:BoardService;
    let board:Board
    const now = new Date();

    let userId:number = 2;
    let categoryId:number = 3;
    let title:string = "test board title";
    let content:string = "test board content";
    let isPublic:boolean = true;

    beforeEach( () => {
        mockedRepository = mock(BoardRepository)
        boardService = new BoardService(instance(mockedRepository))

        board = Board.createBoard(
            userId,
            categoryId,
            title,
            content,
            isPublic,
            now)
        board.id = 1
    })

    describe('createBoardDto test', () => {
        let createBoardDto:CreateBoardDto = new CreateBoardDto();
        createBoardDto.userId = userId;
        createBoardDto.categoryId = categoryId;
        createBoardDto.title = title;
        createBoardDto.content = content;
        createBoardDto.isPublic = isPublic;
        createBoardDto.createdAt = now;
        createBoardDto.updatedAt = now;

        it('dto.toEntity should call Board.createBoard',() => {
            const spyUserSignUp = jest.spyOn(Board,"createBoard")
    
            createBoardDto.toEntity();
            expect(spyUserSignUp).toBeCalledTimes(1)
        })

        it('dto.toEntity should return board',() => {
            const result = createBoardDto.toEntity(now);
            
            expect(result.userId).toBe(createBoardDto.userId)
            expect(result.categoryId).toBe(createBoardDto.categoryId)
            expect(result.title).toBe(createBoardDto.title)
            expect(result.content).toBe(createBoardDto.content)
            expect(result.isPublic).toBe(createBoardDto.isPublic)
            expect(result.createdAt).toBe(createBoardDto.createdAt)
            expect(result.updatedAt).toBe(createBoardDto.updatedAt)
        })
    })

    describe('createBoard method test', () => {
        let createBoardDto:CreateBoardDto = new CreateBoardDto();
        createBoardDto.userId = userId;
        createBoardDto.categoryId = categoryId;
        createBoardDto.title = title;
        createBoardDto.content = content;
        createBoardDto.isPublic = isPublic;
        createBoardDto.createdAt = now;
        createBoardDto.updatedAt = now;

        it('should be a function', () => {
            expect(typeof boardService.createBoard).toBe('function');
        })

        it('shoud return board', async () => {
            when(mockedRepository.save(deepEqual(board))).thenResolve(board)
            
            let mockedDto = mock(CreateBoardDto);
            let dto = instance(mockedDto)
            when(mockedDto.toEntity()).thenReturn(board)

            const result = await boardService.createBoard(dto)

            expect(dto.toEntity()).toBe(board)
            expect(result).toBe(board)
            verify(mockedRepository.save(deepEqual(board))).once()
        })
    
    })
})