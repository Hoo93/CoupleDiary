import { Inject, Service } from "typedi";
import { CommentLikeRepository } from "./CommentLikeRepository";
import { CreateCommentLikeDto } from "./dto/createCommentLikeDto";
import { CommentLike } from "./CommentLike";


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

}