import { instance, mock } from "ts-mockito";
import { BoardService } from "../../../src/Board/BoardService";
import { BoardLike } from "../../../src/BoardLike/BoardLike";
import { BoardLikeRepository } from "../../../src/BoardLike/BoardLikeRepository";
import { BoardLikeService } from "../../../src/BoardLike/BoardLikeService";
import { CreateBoardLikeDto } from "../../../src/BoardLike/dto/createBoardLikeDto";


describe('BoardLike Service Test', () => {
    let mockedRepository:BoardLikeRepository;
    let boardLikeService:BoardLikeService;
    let boardLike:BoardLike
    const now = new Date();

    let userId:number = 1;
    let boardId:number = 2;
    let content:string = "test content";
    let parentCommentId:number|null = null;


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
})