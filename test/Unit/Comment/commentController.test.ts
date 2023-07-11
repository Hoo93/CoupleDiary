import { instance, mock, verify, when } from "ts-mockito";
import { DeleteResult } from "typeorm";
import { CommentService } from "../../../src/Comment/CommentService";
import { CommentController } from "../../../src/Comment/CommentController";
import { CreateCommentDto } from "../../../src/Comment/dto/createCommentDto";
import { UpdateCommentDto } from "../../../src/Comment/dto/updateCommentDto";
import { Comment } from "../../../src/Comment/Comment";
import exp = require("constants");

describe("Comment Controller Test", () => {

    let mockedService:CommentService;
    let commentController:CommentController;

    let userId:number = 2;
    let boardId:number = 3;
    let parentCommentId:number|null;
    let content:string = "test comment content";
    let now:Date = new Date();

    let createCommentDto:CreateCommentDto = new CreateCommentDto();
    createCommentDto.userId = userId,
    createCommentDto.boardId = boardId;
    createCommentDto.content = content;
    createCommentDto.createdAt = now;
    createCommentDto.updatedAt = now;

    const comment = createCommentDto.toEntity()
    comment.id = 1

    const updateCommentDto:UpdateCommentDto = new UpdateCommentDto();
    updateCommentDto.content = "update test content"
    
    beforeEach(() => {
        mockedService = mock(CommentService);
        commentController = new CommentController(instance(mockedService));
    })

    describe("createComment method test", () => {

        it('should have a createComment function', async () => {        
            expect(typeof commentController.createComment).toBe('function')
        })

        it('should call boardService when createComment', async () => {
            when(mockedService.createComment(createCommentDto)).thenResolve(comment)
    
            const result = await commentController.createComment(createCommentDto)
    
            verify(mockedService.createComment(createCommentDto)).once()
            expect(result).toBe(comment)
        })

    })

    describe("findById method test", () => {

        it('should have a findById function', async () => {        
            expect(typeof commentController.findById).toBe('function')
        })
    
        it('should call boardService when findById', async () => {
            
            when(mockedService.findById(comment.id)).thenResolve(comment)
    
            const result = await commentController.findById(comment.id)
    
            verify(mockedService.findById(comment.id)).once()
            expect(result).toBe(comment)
        })

    })

    describe("findAll method test", () => {

        it('should have a findAll function', async () => {        
            expect(typeof commentController.findAll).toBe('function')
        })
    
        it('should call boardService when findAll', async () => {
            const comments:Comment[] = [comment,comment]
            
            when(mockedService.findAll()).thenResolve(comments)
            
            const result = await commentController.findAll()
    
            verify(mockedService.findAll()).once()
            expect(result).toBe(comments)
            expect(result.length).toBe(2)
        })

    })

    describe("updateComment method test", () => {

        it('should have a updateComment function', async () => {        
            expect(typeof commentController.updateComment).toBe('function')
        })

        it('should return updateComment comment.id' , async() => {
            when(mockedService.updateComment(comment.id,updateCommentDto)).thenResolve(comment.id)

            const result = await commentController.updateComment(comment.id,updateCommentDto);
            
            verify(mockedService.updateComment(comment.id,updateCommentDto)).once()
            expect(result).toBe(comment.id)
        })
    })

    describe("deleteComment method test", () => {

        it('should have a deleteComment function', async () => {        
            expect(typeof commentController.deleteComment).toBe('function')
        })

        it('should return deleteResult', async () => {

            const deleteResult = new DeleteResult()

            when(mockedService.deleteComment(comment.id)).thenResolve(deleteResult)
            const result = await commentController.deleteComment(comment.id)

            verify(mockedService.deleteComment(comment.id)).once()
            expect(result).toBe(deleteResult)
        })
    })


})