import { Inject, Service } from "typedi";
import { CommentRepository } from "./CommentRepository";
import { CreateCommentDto } from "./dto/createCommentDto";
import { Comment } from "./Comment";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { UpdateCommentDto } from "./dto/updateCommentDto";
import { DeleteResult } from "typeorm";
import { NoticeRepository } from "../Notice/NoticeRepository";

@Service()
export class CommentService {
    constructor (
        @Inject()
        private commentRepository:CommentRepository,
    ) {}
    
    public async createComment (createCommentDto:CreateCommentDto):Promise<Comment> {
        const comment = createCommentDto.toEntity();
        
        try {
            const result = await this.commentRepository.save(comment)
            return result
        } catch(error) {
            console.error("error on save :",error);
            return error.message;
        }   
    }

    public async findById (id:number): Promise<Comment> {
        const comment = await this.commentRepository.findOneBy({id})
        if (!comment) {
            throw new NotFoundError(`comment with ${id} doesn't exist`)
        }
        return comment
    }

    public async findAll():Promise<Comment[]> {
        return await this.commentRepository.find();
    }

    public async updateComment(id:number,updateCommentDto:UpdateCommentDto): Promise<Number> {
        let comment = await this.commentRepository.findOneBy({id});
        if (!comment) {
            throw new NotFoundError(`comment with id:${id} doesn't exist`)
        }
        
        const updateResult = await this.commentRepository.update(comment.id,updateCommentDto.commentUpdateInfo());
        if (updateResult.affected === 0) {
            throw new BadRequestError('comment update fail')
        }
        return comment.id;
    }

    public async deleteComment(id:number):Promise<DeleteResult> {
        const comment:Comment = await this.commentRepository.findOneBy({id});
        if ( !comment ) {
            throw new NotFoundError(`comment with id:${id} doesn't exist`)
        }

        const deleteResult:DeleteResult = await this.commentRepository.delete({id});
        if ( deleteResult.affected === 0) {
            throw new BadRequestError('comment delete fail')
        }
        return deleteResult
    }

}