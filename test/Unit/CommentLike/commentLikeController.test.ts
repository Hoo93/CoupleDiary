import { instance, mock, verify, when } from "ts-mockito";
import { DeleteResult } from "typeorm";
import { CommentLike } from "../../../src/CommentLike/CommentLike";
import { CommentLikeService } from "../../../src/CommentLike/CommenLikeService";
import { CommentLikeController } from "../../../src/CommentLike/CommentLikeController";
import { CreateCommentLikeDto } from "../../../src/CommentLike/dto/createCommentLikeDto";

describe("CommentLike Controller Test", () => {

    let mockedService:CommentLikeService;
    let commentLikeController:CommentLikeController;

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
        commentLikeController = new CommentLikeController(instance(mockedService));
    })

    describe("createCommentLike method test", () => {

        it('should have a createCommentLike function', async () => {        
            expect(typeof commentLikeController.createCommentLike).toBe('function')
        })

        it('should call CommentLikeService when createCommentLike', async () => {
            when(mockedService.createCommentLike(createCommentLikeDto)).thenResolve(commentLike)
    
            let commentLikeController = new CommentLikeController(instance(mockedService));
            const result = await commentLikeController.createCommentLike(createCommentLikeDto)
    
            verify(mockedService.createCommentLike(createCommentLikeDto)).once()
            expect(result).toBe(commentLike)
        })

    })

    describe("findById method test", () => {

        it('should have a findById function', async () => {        
            expect(typeof commentLikeController.findById).toBe('function')
        })
    
        it('should call commentLikeService when findById', async () => {
            
            when(mockedService.findById(commentLike.id)).thenResolve(commentLike)
    
            const result = await commentLikeController.findById(commentLike.id)
    
            verify(mockedService.findById(commentLike.id)).once()
            expect(result).toBe(commentLike)
        })

    })

    describe("findAll method test", () => {

        it('should have a findAll function', async () => {        
            expect(typeof commentLikeController.findAll).toBe('function')
        })
    
        it('should call commentLikeService when findAll', async () => {
            const commentLikes:CommentLike[] = [commentLike]
            
            when(mockedService.findAll()).thenResolve(commentLikes)
            
            const result = await commentLikeController.findAll()
    
            verify(mockedService.findAll()).once()
            expect(result).toBe(commentLikes)
        })

    })

})