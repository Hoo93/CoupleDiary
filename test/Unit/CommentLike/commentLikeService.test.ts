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
})