import { Body, JsonController, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { CommentService } from "./CommentService";
import { CreateCommentDto } from "./dto/createCommentDto";
import { Comment } from "./Comment";


@JsonController('/comment')
@Service()
export class CommentController {
    constructor (
        @Inject()
        private commentService:CommentService
    ) {}

    @Post()
    public async createComment(@Body() createCommentDto:CreateCommentDto):Promise<Comment> {
        try {
            return await this.commentService.createComment(createCommentDto)
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }

}