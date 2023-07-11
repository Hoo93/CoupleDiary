import { instance, mock, verify, when } from "ts-mockito";
import { DeleteResult } from "typeorm";
import { CommentLike } from "../../../src/CommentLike/CommentLike";
import { CommentLikeService } from "../../../src/CommentLike/CommenLikeService";
import { CommentLikeController } from "../../../src/CommentLike/CommentLikeController";
import { CreateCommentLikeDto } from "../../../src/CommentLike/dto/createCommentLikeDto";

describe("CommentLike Controller Test", () => {

    let mockedService:CommentLikeService;
    let commentLikeService:CommentLikeController;

    let userId:number = 2;
    let commentId:number = 3;
    let now:Date = new Date();

    let createCommentLikeDto:CreateCommentLikeDto = new CreateCommentLikeDto();
    createCommentLikeDto.userId = userId;
    createCommentLikeDto.commentId = commentId;
    createCommentLikeDto.createdAt = now;
    createCommentLikeDto.updatedAt = now;

    const commentLike = createCommentLikeDto.toEntity()
    commentLike.id = 1
    
    beforeEach(() => {
        mockedService = mock(CommentLikeService);
        commentLikeService = new CommentLikeController(instance(mockedService));
    })

    describe("createCommentLike method test", () => {

        it('should have a createCommentLike function', async () => {        
            expect(typeof commentLikeService.createCommentLike).toBe('function')
        })

        it('should call CommentLikeService when createCommentLike', async () => {
            when(mockedService.createCommentLike(createCommentLikeDto)).thenResolve(commentLike)
    
            let commentLikeService = new CommentLikeController(instance(mockedService));
            const result = await commentLikeService.createCommentLike(createCommentLikeDto)
    
            verify(mockedService.createCommentLike(createCommentLikeDto)).once()
            expect(result).toBe(commentLike)
        })

    })
})