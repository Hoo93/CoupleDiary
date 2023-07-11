import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { Comment } from "../../../src/Comment/Comment";
import { CommentRepository } from "../../../src/Comment/CommentRepository";
import { CommentService } from "../../../src/Comment/CommentService";
import { CreateCommentDto } from "../../../src/Comment/dto/createCommentDto";
import { UpdateCommentDto } from "../../../src/Comment/dto/updateCommentDto";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { DeleteResult, UpdateResult } from "typeorm";

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

    describe('commentService findById test', () => {
        
        it('should be a function', async () => {
            expect(typeof commentService.findById).toBe('function')
        })

        it('should return comment', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:1}))).thenResolve(comment)
            
            const result = await commentService.findById(1)
            
            expect(result).toBe(comment)
            verify(mockedRepository.findOneBy(deepEqual({id:1}))).once()
        })

        it('should throw NotFoundError', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:comment.id}))).thenReturn(null)
        
            await expect(async () => {
                await commentService.findById(comment.id)
            }).rejects.toThrowError(NotFoundError)
            verify(mockedRepository.findOneBy(deepEqual({id:comment.id}))).once()
        })

    })
    
    describe('commentService findAll method test' , () => {

        it('should be a function', async () => {
            expect(typeof commentService.findAll).toBe('function')
        })

        it('should return Comment[]', async () => {
            const comments:Comment[] = [comment]
            when(mockedRepository.find()).thenResolve(comments)

            const result = await commentService.findAll();

            expect(result).toBe(comments)
            verify(mockedRepository.find()).once()
        })

    })

    describe('commentService updateComment method test' , () => {
        let updateCommentDto:UpdateCommentDto;
        let updatedComment:Comment

        beforeEach(() => {
            updateCommentDto = new UpdateCommentDto();
            updateCommentDto.content = "test update content";
        })

        it('should be a function',async () => {
            expect(typeof commentService.updateComment).toBe('function')
        })

        it('should return comment.id', async () => {
            let updateResult = new UpdateResult()
            updateResult.affected = 1
            
            const mockedCommentUpdateDto = mock(UpdateCommentDto)
            when(mockedCommentUpdateDto.commentUpdateInfo()).thenReturn(updateCommentDto.commentUpdateInfo(now))
            let mUpdateCommentDto  = instance(mockedCommentUpdateDto)
            
            when(mockedRepository.findOneBy(deepEqual({id:comment.id}))).thenResolve(comment)
            when(mockedRepository.update(1,deepEqual(updateCommentDto.commentUpdateInfo(now)))).thenResolve(updateResult)

            const result = await commentService.updateComment(comment.id,mUpdateCommentDto);

            verify(mockedRepository.findOneBy(deepEqual({id:comment.id}))).once()
            verify(mockedRepository.update(deepEqual(comment.id),deepEqual(updateCommentDto.commentUpdateInfo(now)))).once()
            expect(result).toBe(comment.id)            
            
        })
        it('should throw NotFoundError when comment with id doesnt exist', async() => {
            
            when(mockedRepository.findOneBy(deepEqual({id:comment.id}))).thenReturn(null)
            
            await expect( async () => {
                await commentService.updateComment(1,updateCommentDto) 
            }).rejects.toThrowError(new NotFoundError("comment with id:1 doesn't exist"))
            verify(mockedRepository.findOneBy(deepEqual({id:comment.id}))).once()
    
        })
    
        it('should throw error when updateResult.affected === 0 ', async () => {
            let updateResult = new UpdateResult()
            updateResult.affected = 0
            
            const mockedCommentUpdateDto = mock(UpdateCommentDto)
            when(mockedCommentUpdateDto.commentUpdateInfo()).thenReturn(updateCommentDto.commentUpdateInfo(now))
            let mUpdateCommentDto  = instance(mockedCommentUpdateDto)
            
            when(mockedRepository.findOneBy(deepEqual({id:comment.id}))).thenResolve(comment)
            when(mockedRepository.update(1,deepEqual(updateCommentDto.commentUpdateInfo(now)))).thenResolve(updateResult)
    
            await expect( async () => {
                await commentService.updateComment(comment.id,mUpdateCommentDto);
            }).rejects.toThrowError(new BadRequestError('comment update fail'))
            verify(mockedRepository.findOneBy(deepEqual({id:comment.id}))).once()
            verify(mockedRepository.update(deepEqual(comment.id),deepEqual(updateCommentDto.commentUpdateInfo(now)))).once()
        })

    })

    describe('commentService deleteComment method test' , () => {
    
        it('should be a function',async () => {
            expect(typeof commentService.deleteComment).toBe('function')
        })

        it('should throw NotFoundError when user with id doesnt exist', async() => {
            
            when(mockedRepository.findOneBy(deepEqual({id:comment.id}))).thenReturn(null)
            
            await expect( async () => {
                await commentService.deleteComment(comment.id) 
            }).rejects.toThrowError(new NotFoundError(`comment with id:${comment.id} doesn't exist`))
            verify(mockedRepository.findOneBy(deepEqual({id:comment.id}))).once()

        })

        it('should return deleteResult' , async () => {
            let deleteResult = new DeleteResult();
            deleteResult.affected = 1;

            when(mockedRepository.findOneBy(deepEqual({id:comment.id}))).thenResolve(comment)
            when(mockedRepository.delete(deepEqual({id:comment.id}))).thenResolve(deleteResult)

            const result = await commentService.deleteComment(comment.id);

            verify(mockedRepository.findOneBy(deepEqual({id:comment.id}))).once()
            verify(mockedRepository.delete(deepEqual({id:comment.id}))).once()
            expect(result).toBe(deleteResult)
        })
    })


    

    
})

