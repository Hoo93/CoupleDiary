import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { NotFoundError } from "routing-controllers";
import { DeleteResult } from "typeorm";
import { CommentLikeRepository } from "../../../src/CommentLike/CommentLikeRepository";
import { CommentLikeService } from "../../../src/CommentLike/CommenLikeService";
import { CommentLike } from "../../../src/CommentLike/CommentLike";
import { CreateCommentLikeDto } from "../../../src/CommentLike/dto/createCommentLikeDto";


describe('CommentLike Service Test', () => {
    let mockedRepository:CommentLikeRepository;
    let commentLikeService:CommentLikeService;
    let commentLike:CommentLike
    const now = new Date();

    let userId:number = 1;
    let commentId:number = 2;

    beforeEach( () => {
        mockedRepository = mock(CommentLikeRepository)
        commentLikeService = new CommentLikeService(instance(mockedRepository))

        commentLike = CommentLike.createCommentLike(
            userId,
            commentId,
            now)
        commentLike.id = 1
    })

    describe('createCommentLikeDto test', () => {
        let createCommentLikeDto:CreateCommentLikeDto = new CreateCommentLikeDto();
        createCommentLikeDto.userId = userId;
        createCommentLikeDto.commentId = commentId;
        createCommentLikeDto.createdAt = now;
        createCommentLikeDto.updatedAt = now;

        it('dto.toEntity should call CommentLike.createCommentLike',() => {
            const spyCreateCommentLikeDto = jest.spyOn(CommentLike,"createCommentLike")
    
            createCommentLikeDto.toEntity();
            expect(spyCreateCommentLikeDto).toBeCalledTimes(1)
        })

        it('should return commentLike',() => {
            const result = createCommentLikeDto.toEntity(now);
            
            expect(result.userId).toBe(createCommentLikeDto.userId)
            expect(result.commentId).toBe(createCommentLikeDto.commentId)
            expect(result.createdAt).toBe(createCommentLikeDto.createdAt)
            expect(result.updatedAt).toBe(createCommentLikeDto.updatedAt)
        })
    })

    describe('createCommentLike method test', () => {
        let createCommentLikeDto:CreateCommentLikeDto = new CreateCommentLikeDto();
        createCommentLikeDto.userId = userId;
        createCommentLikeDto.commentId = commentId;
        createCommentLikeDto.createdAt = now;
        createCommentLikeDto.updatedAt = now;

        it('should be a function', () => {
            expect(typeof commentLikeService.createCommentLike).toBe('function');
        })

        it('shoud return commentLike', async () => {
            when(mockedRepository.save(deepEqual(commentLike))).thenResolve(commentLike)
            
            let mockedDto = mock(CreateCommentLikeDto);
            let dto = instance(mockedDto)
            when(mockedDto.toEntity()).thenReturn(commentLike)

            const result = await commentLikeService.createCommentLike(dto)

            expect(dto.toEntity()).toBe(commentLike)
            expect(result).toBe(commentLike)
            verify(mockedRepository.save(deepEqual(commentLike))).once()
        })
    
    })

    describe('commentLikeService findById test', () => {
        
        it('should be a function', async () => {
            expect(typeof commentLikeService.findById).toBe('function')
        })

        it('should return commentLike', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:commentLike.id}))).thenResolve(commentLike)
            
            const result = await commentLikeService.findById(commentLike.id)
            
            expect(result).toBe(commentLike)
            verify(mockedRepository.findOneBy(deepEqual({id:commentLike.id}))).once()
        })

        it('should throw NotFoundError', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:commentLike.id}))).thenReturn(null)
        
            await expect(async () => {
                await commentLikeService.findById(commentLike.id)
            }).rejects.toThrowError(NotFoundError)
            verify(mockedRepository.findOneBy(deepEqual({id:commentLike.id}))).once()
        })

    })

    describe('commentLikeService findAll method test' , () => {

        it('should be a function', async () => {
            expect(typeof commentLikeService.findAll).toBe('function')
        })

        it('should return CommentLike[]', async () => {
            const commentLikes:CommentLike[] = [commentLike]
            when(mockedRepository.find()).thenResolve(commentLikes)

            const result = await commentLikeService.findAll();

            expect(result).toBe(commentLikes)
            verify(mockedRepository.find()).once()
        })

    })

})