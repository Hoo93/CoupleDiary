import { Inject, Service } from "typedi";
import { CommentLikeRepository } from "./CommentLikeRepository";
import { CreateCommentLikeDto } from "./dto/createCommentLikeDto";
import { CommentLike } from "./CommentLike";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { DeleteResult } from "typeorm";


@Service()
export class CommentLikeService {
    constructor(
        @Inject()
        private commentLikeRepository:CommentLikeRepository
    ) {}

    public async createCommentLike (createCommentLikeDto:CreateCommentLikeDto):Promise<CommentLike> {
        const commentLike = createCommentLikeDto.toEntity();

        try {
            const result = await this.commentLikeRepository.save(commentLike)
            return result
        } catch(error) {
            console.error("error on save :",error);
            return error.message;
        }   
    }

    public async findById (id:number): Promise<CommentLike> {
        const commentLike = await this.commentLikeRepository.findOneBy({id})
        if (!commentLike) {
            throw new NotFoundError(`commentLike with ${id} doesn't exist`)
        }
        return commentLike
    }

    public async findAll():Promise<CommentLike[]> {
        return await this.commentLikeRepository.find();
    }

    public async deleteCommentLike(id:number):Promise<DeleteResult> {
        const commentLike:CommentLike = await this.commentLikeRepository.findOneBy({id});
        if ( !commentLike ) {
            throw new NotFoundError(`CommentLike with id:${id} doesn't exist`)
        }

        const deleteResult:DeleteResult = await this.commentLikeRepository.delete({id});
        if ( deleteResult.affected === 0) {
            throw new BadRequestError('CommentLike delete fail')
        }
        return deleteResult
    }

}