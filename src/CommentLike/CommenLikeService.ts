import { Inject, Service } from "typedi";
import { CommentLikeRepository } from "./CommentLikeRepository";
import { CreateCommentLikeDto } from "./dto/createCommentLikeDto";
import { CommentLike } from "./CommentLike";
import { NotFoundError } from "routing-controllers";


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

}