import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { Comment } from "../../../src/Comment/Comment";
import { CommentRepository } from "../../../src/Comment/CommentRepository";
import { CommentService } from "../../../src/Comment/CommentService";
import { CreateCommentDto } from "../../../src/Comment/dto/createCommentDto";
import { UpdateCommentDto } from "../../../src/Comment/dto/updateCommentDto";

describe('Comment Service Test', () => {
    let mockedRepository:CommentRepository;
    let commentService:CommentService;
    let comment:Comment
    const now = new Date();

    let userId:number = 1;
    let boardId:number = 2;
    let content:string = "test content";
    let parentCommentId:number|null = null;


    beforeEach( () => {
        mockedRepository = mock(CommentRepository)
        commentService = new CommentService(instance(mockedRepository))

        comment = Comment.createComment(
            userId,
            boardId,
            content,
            now)
        comment.id = 1
    })

    describe('createCommentDto test', () => {
        let createCommentDto:CreateCommentDto = new CreateCommentDto();
        createCommentDto.userId = userId;
        createCommentDto.boardId = boardId;
        createCommentDto.content = content;
        createCommentDto.createdAt = now;
        createCommentDto.updatedAt = now;

        it('dto.toEntity should call Comment.createComment',() => {
            const spyCreateComment = jest.spyOn(Comment,"createComment")
    
            createCommentDto.toEntity();
            expect(spyCreateComment).toBeCalledTimes(1)
        })

        it('should return comment with parentCommentId = null',() => {
            const result = createCommentDto.toEntity(now);
            
            expect(result.userId).toBe(createCommentDto.userId)
            expect(result.boardId).toBe(createCommentDto.boardId)
            expect(result.content).toBe(createCommentDto.content)
            expect(result.createdAt).toBe(createCommentDto.createdAt)
            expect(result.updatedAt).toBe(createCommentDto.updatedAt)
            expect(result.parentCommentId).toBe(null)
        })

        it('should return comment with parentCommentId = 123',() => {
            createCommentDto.parentCommentID = 123
            const result = createCommentDto.toEntity(now);
            
            expect(result.userId).toBe(createCommentDto.userId)
            expect(result.boardId).toBe(createCommentDto.boardId)
            expect(result.content).toBe(createCommentDto.content)
            expect(result.createdAt).toBe(createCommentDto.createdAt)
            expect(result.updatedAt).toBe(createCommentDto.updatedAt)
            expect(result.parentCommentId).toBe(123)
        })
    })

    describe('updateCommentDto test', () => {

        let updateCommentDto:UpdateCommentDto;
        let updatedComment:Comment

        beforeEach(() => {
            updateCommentDto = new UpdateCommentDto();
            updateCommentDto.content = "test update content";
        })

        it('updateCommentDto.commentUpdateInfo should return updateInfo', () => {
            const updateInfo = updateCommentDto.commentUpdateInfo(now)
            expect(updateInfo.content).toBe(updateCommentDto.content)
            expect(updateInfo.updatedAt).toBe(now)
        })
    })

    describe('createComment method test', () => {
        let createCommentDto:CreateCommentDto = new CreateCommentDto();
        createCommentDto.userId = userId;
        createCommentDto.boardId = boardId;
        createCommentDto.content = content;
        createCommentDto.createdAt = now;
        createCommentDto.updatedAt = now;

        it('should be a function', () => {
            expect(typeof commentService.createComment).toBe('function');
        })

        it('shoud return comment', async () => {
            when(mockedRepository.save(deepEqual(comment))).thenResolve(comment)
            
            let mockedDto = mock(CreateCommentDto);
            let dto = instance(mockedDto)
            when(mockedDto.toEntity()).thenReturn(comment)

            const result = await commentService.createComment(dto)

            expect(dto.toEntity()).toBe(comment)
            expect(result).toBe(comment)
            verify(mockedRepository.save(deepEqual(comment))).once()
        })
    
    })




})