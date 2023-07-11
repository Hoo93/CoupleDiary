import { Inject, Service } from "typedi";
import { BoardLikeService } from "./BoardLikeService";
import { Body, Post } from "routing-controllers";
import { CreateBoardLikeDto } from "./dto/createBoardLikeDto";
import { BoardLike } from "./BoardLike";


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


    
}