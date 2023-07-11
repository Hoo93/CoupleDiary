import { Body, Get, JsonController, Param, Patch, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { CommentService } from "./CommentService";
import { CreateCommentDto } from "./dto/createCommentDto";
import { Comment } from "./Comment";
import { UpdateCommentDto } from "./dto/updateCommentDto";


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

    @Get()
    public async findAll():Promise<Comment[]> {
        try {
            return await this.commentService.findAll();
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }

    @Get('/:id')
    public async findById(@Param('id') id:number):Promise<Comment> {
        try {
            return await this.commentService.findById(id);
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }

    @Patch('/:id')
    public async updateComment(
        @Param('/id') id:number,
        @Body() updateComentDto:UpdateCommentDto) {
            try {
                return await this.commentService.updateComment(id,updateComentDto);
            } catch (error) {
                console.error("controller error:",error)
                return error.message
            }
        }






}