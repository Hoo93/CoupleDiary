import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { BoardService } from "../../../src/Board/BoardService";
import { BoardLike } from "../../../src/BoardLike/BoardLike";
import { BoardLikeRepository } from "../../../src/BoardLike/BoardLikeRepository";
import { BoardLikeService } from "../../../src/BoardLike/BoardLikeService";
import { CreateBoardLikeDto } from "../../../src/BoardLike/dto/createBoardLikeDto";
import { NotFoundError } from "routing-controllers";
import { DeleteResult } from "typeorm";


describe('BoardLike Service Test', () => {
    let mockedRepository:BoardLikeRepository;
    let boardLikeService:BoardLikeService;
    let boardLike:BoardLike
    const now = new Date();

    let userId:number = 1;
    let boardId:number = 2;

    beforeEach( () => {
        mockedRepository = mock(BoardLikeRepository)
        boardLikeService = new BoardLikeService(instance(mockedRepository))

        boardLike = BoardLike.createBoardLike(
            userId,
            boardId,
            now)
        boardLike.id = 1
    })

    describe('createBoardLikeDto test', () => {
        let createBoardLikeDto:CreateBoardLikeDto = new CreateBoardLikeDto();
        createBoardLikeDto.userId = userId;
        createBoardLikeDto.boardId = boardId;
        createBoardLikeDto.createdAt = now;
        createBoardLikeDto.updatedAt = now;

        it('dto.toEntity should call BoardLike.createBoardLike',() => {
            const spyCreateBoardLike = jest.spyOn(BoardLike,"createBoardLike")
    
            createBoardLikeDto.toEntity();
            expect(spyCreateBoardLike).toBeCalledTimes(1)
        })

        it('should return boardLike',() => {
            const result = createBoardLikeDto.toEntity(now);
            
            expect(result.userId).toBe(createBoardLikeDto.userId)
            expect(result.boardId).toBe(createBoardLikeDto.boardId)
            expect(result.createdAt).toBe(createBoardLikeDto.createdAt)
            expect(result.updatedAt).toBe(createBoardLikeDto.updatedAt)
        })
    })

    describe('createBoardLike method test', () => {
        let createBoardLikeDto:CreateBoardLikeDto = new CreateBoardLikeDto();
        createBoardLikeDto.userId = userId;
        createBoardLikeDto.boardId = boardId;
        createBoardLikeDto.createdAt = now;
        createBoardLikeDto.updatedAt = now;

        it('should be a function', () => {
            expect(typeof boardLikeService.createBoardLike).toBe('function');
        })

        it('shoud return boardLike', async () => {
            when(mockedRepository.save(deepEqual(boardLike))).thenResolve(boardLike)
            
            let mockedDto = mock(CreateBoardLikeDto);
            let dto = instance(mockedDto)
            when(mockedDto.toEntity()).thenReturn(boardLike)

            const result = await boardLikeService.createBoardLike(dto)

            expect(dto.toEntity()).toBe(boardLike)
            expect(result).toBe(boardLike)
            verify(mockedRepository.save(deepEqual(boardLike))).once()
        })
    
    })

    describe('boardLikeService findById test', () => {
        
        it('should be a function', async () => {
            expect(typeof boardLikeService.findById).toBe('function')
        })

        it('should return boardLike', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:boardLike.id}))).thenResolve(boardLike)
            
            const result = await boardLikeService.findById(boardLike.id)
            
            expect(result).toBe(boardLike)
            verify(mockedRepository.findOneBy(deepEqual({id:boardLike.id}))).once()
        })

        it('should throw NotFoundError', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:boardLike.id}))).thenReturn(null)
        
            await expect(async () => {
                await boardLikeService.findById(boardLike.id)
            }).rejects.toThrowError(NotFoundError)
            verify(mockedRepository.findOneBy(deepEqual({id:boardLike.id}))).once()
        })

    })

    describe('boardLikeService findAll method test' , () => {

        it('should be a function', async () => {
            expect(typeof boardLikeService.findAll).toBe('function')
        })

        it('should return BoardLike[]', async () => {
            const boardLikes:BoardLike[] = [boardLike]
            when(mockedRepository.find()).thenResolve(boardLikes)

            const result = await boardLikeService.findAll();

            expect(result).toBe(boardLikes)
            verify(mockedRepository.find()).once()
        })

    })

    describe('boardLikeService deleteBoardLike method test' , () => {
    
        it('should be a function',async () => {
            expect(typeof boardLikeService.deleteBoardLike).toBe('function')
        })

        it('should throw NotFoundError when boardLike with id doesnt exist', async() => {
            
            when(mockedRepository.findOneBy(deepEqual({id:boardLike.id}))).thenReturn(null)
            
            await expect( async () => {
                await boardLikeService.deleteBoardLike(boardLike.id) 
            }).rejects.toThrowError(new NotFoundError(`boardLike with id:${boardLike.id} doesn't exist`))
            verify(mockedRepository.findOneBy(deepEqual({id:boardLike.id}))).once()

        })

        it('should return deleteResult' , async () => {
            let deleteResult = new DeleteResult();
            deleteResult.affected = 1;

            when(mockedRepository.findOneBy(deepEqual({id:boardLike.id}))).thenResolve(boardLike)
            when(mockedRepository.delete(deepEqual({id:boardLike.id}))).thenResolve(deleteResult)

            const result = await boardLikeService.deleteBoardLike(boardLike.id);

            verify(mockedRepository.findOneBy(deepEqual({id:boardLike.id}))).once()
            verify(mockedRepository.delete(deepEqual({id:boardLike.id}))).once()
            expect(result).toBe(deleteResult)
        })
    })



    


})