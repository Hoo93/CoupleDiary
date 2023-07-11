import { instance, mock, verify, when } from "ts-mockito";
import { DeleteResult } from "typeorm";
import { CommentService } from "../../../src/Comment/CommentService";
import { CommentController } from "../../../src/Comment/CommentController";
import { CreateCommentDto } from "../../../src/Comment/dto/createCommentDto";
import { UpdateCommentDto } from "../../../src/Comment/dto/updateCommentDto";

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
})