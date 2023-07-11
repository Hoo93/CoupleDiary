import { Body, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { CommentLikeService } from "./CommenLikeService";
import { CreateCommentLikeDto } from "./dto/createCommentLikeDto";
import { CommentLike } from "./CommentLike";

@JsonController('/commentlike')
export class CommentLikeController {
    constructor (
        @Inject()
        private commentLikeService:CommentLikeService
    ) {}

    @Post()
    public async createCommentLike(@Body() createCommentLikeDto:CreateCommentLikeDto):Promise<CommentLike> {
        try {
            return await this.commentLikeService.createCommentLike(createCommentLikeDto)
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }
    

}