import { Body, Get, JsonController, Param, Post } from "routing-controllers";
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

    @Get()
    public async findAll():Promise<CommentLike[]> {
        try {
            return await this.commentLikeService.findAll();
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }

    @Get('/:id')
    public async findById(@Param('id') id:number):Promise<CommentLike> {
        try {
            return await this.commentLikeService.findById(id);
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }
    

}