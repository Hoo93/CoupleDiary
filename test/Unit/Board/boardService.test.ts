import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { Board } from "../../../src/Board/Board";
import { BoardRepository } from "../../../src/Board/BoardRepository";
import { BoardController } from "../../../src/Board/boardController";
import { BoardService } from "../../../src/Board/boardService";
import { CreateBoardDto } from "../../../src/Board/dto/createBoardDto";
import { BadRequestError, BodyParam, NotFoundError } from "routing-controllers";
import { UpdateBoardDto } from "../../../src/Board/dto/updateBoardDto";
import { UpdateResult } from "typeorm";


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

    describe('updateBoardDto test', () => {

        let updateBoardDto:UpdateBoardDto;
        let updatedBoard:Board

        beforeEach(() => {
            updateBoardDto = new UpdateBoardDto();
            updateBoardDto.title = "test update title";
            updateBoardDto.content = "test update content";
            updateBoardDto.categoryId = 123;
        })

        it('updateBoardDto.boardUpdateInfo should return updateInfo', () => {
            const updateInfo = updateBoardDto.boardUpdateInfo(now)
            expect(updateInfo.title).toBe(updateBoardDto.title)
            expect(updateInfo.content).toBe(updateBoardDto.content)
            expect(updateInfo.categoryId).toBe(updateBoardDto.categoryId)
            expect(updateInfo.updatedAt).toBe(now)
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

    describe('boardService findUserById test', () => {
        
        it('should be a function', async () => {
            expect(typeof boardService.findById).toBe('function')
        })

        it('should return board', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:1}))).thenResolve(board)
            
            const result = await boardService.findById(1)
            
            expect(result).toBe(board)
            verify(mockedRepository.findOneBy(deepEqual({id:1}))).once()
        })

        it('should throw NotFoundError', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:1}))).thenReturn(null)
        
            await expect(async () => {
                await boardService.findById(1)
            }).rejects.toThrowError(NotFoundError)
            verify(mockedRepository.findOneBy(deepEqual({id:1}))).once()
        })

    })

    describe('boardService findAll method test' , () => {

        it('should be a function', async () => {
            expect(typeof boardService.findAll).toBe('function')
        })

        it('should return Board[]', async () => {
            const boards:Board[] = [board]
            when(mockedRepository.find()).thenResolve(boards)

            const result = await boardService.findAll();

            expect(result).toBe(boards)
            verify(mockedRepository.find()).once()
        })

    })

    describe('boardService updateBoard method test' , () => {
        let updateBoardDto:UpdateBoardDto;
        let updatedBoard:Board

        beforeEach(() => {
            updateBoardDto = new UpdateBoardDto();
            updateBoardDto.title = "test update title";
            updateBoardDto.content = "test update content";
            updateBoardDto.categoryId = 123;
        })

        it('should be a function',async () => {
            expect(typeof boardService.updateBoard).toBe('function')
        })

        it('should return board.id', async () => {
            let updateResult = new UpdateResult()
            updateResult.affected = 1
            
            const mockedUpdateBoardDto = mock(UpdateBoardDto)
            when(mockedUpdateBoardDto.boardUpdateInfo()).thenReturn(updateBoardDto.boardUpdateInfo(now))
            let mUpdateBoardDto  = instance(mockedUpdateBoardDto)
            
            when(mockedRepository.findOneBy(deepEqual({id:board.id}))).thenResolve(board)
            when(mockedRepository.update(1,deepEqual(updateBoardDto.boardUpdateInfo(now)))).thenResolve(updateResult)

            const result = await boardService.updateBoard(board.id,mUpdateBoardDto);

            verify(mockedRepository.findOneBy(deepEqual({id:board.id}))).once()
            verify(mockedRepository.update(deepEqual(board.id),deepEqual(updateBoardDto.boardUpdateInfo(now)))).once()
            expect(result).toBe(board.id)            
            
        })

        it('should throw NotFoundError when board with id doesnt exist', async() => {
            
            when(mockedRepository.findOneBy(deepEqual({id:board.id}))).thenReturn(null)
            
            await expect( async () => {
                await boardService.updateBoard(1,updateBoardDto) 
            }).rejects.toThrowError(new NotFoundError("board with id:1 doesn't exist"))
            verify(mockedRepository.findOneBy(deepEqual({id:board.id}))).once()

        })

        it('should throw error when updateResult.affected === 0 ', async () => {
            let updateResult = new UpdateResult()
            updateResult.affected = 0
            
            const mockedUpdateBoardDto = mock(UpdateBoardDto)
            when(mockedUpdateBoardDto.boardUpdateInfo()).thenReturn(updateBoardDto.boardUpdateInfo(now))
            let mUpdateBoardDto  = instance(mockedUpdateBoardDto)
            
            when(mockedRepository.findOneBy(deepEqual({id:board.id}))).thenResolve(board)
            when(mockedRepository.update(1,deepEqual(updateBoardDto.boardUpdateInfo(now)))).thenResolve(updateResult)

            

            await expect( async () => {
                await boardService.updateBoard(board.id,mUpdateBoardDto);
            }).rejects.toThrowError(new BadRequestError('board update fail'))
            verify(mockedRepository.findOneBy(deepEqual({id:board.id}))).once()
            verify(mockedRepository.update(deepEqual(board.id),deepEqual(updateBoardDto.boardUpdateInfo(now)))).once()
        })
    })


})