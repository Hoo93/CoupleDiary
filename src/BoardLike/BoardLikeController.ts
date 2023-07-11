import { Inject, Service } from "typedi";
import { BoardLikeService } from "./BoardLikeService";
import { Body, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { CreateBoardLikeDto } from "./dto/createBoardLikeDto";
import { BoardLike } from "./BoardLike";


@JsonController('/boardlike')
@Service()
export class BoadrLikeController {
    constructor (
        @Inject()
        private boardLikeService:BoardLikeService
    ) {}

    @Post()
    public async createBoardLike(@Body() createBoardLikeDto:CreateBoardLikeDto):Promise<BoardLike> {
        try {
            return await this.boardLikeService.createBoardLike(createBoardLikeDto)
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }

    @Get()
    public async findAll():Promise<BoardLike[]> {
        try {
            return await this.boardLikeService.findAll();
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }

    @Get('/:id')
    public async findById(@Param('id') id:number):Promise<BoardLike> {
        try {
            return await this.boardLikeService.findById(id);
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }

    @Delete('/:id')
    public async deleteBoardLike (@Param('id') id:number) {
        try {
            return await this.boardLikeService.deleteBoardLike(id)
        } catch(error) {
            console.log("delete error")
            console.error(error);
            return error.message;
        }
    }


    
}