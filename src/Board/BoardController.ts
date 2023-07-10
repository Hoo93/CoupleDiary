import { Body, JsonController, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { BoardService } from "./boardService";
import { CreateBoardDto } from "./dto/createBoardDto";
import { Category } from "../Category/Category";

@JsonController('board')
@Service()
export class BoardController {
    constructor (
        @Inject()
        private boardService:BoardService
    ) {}

    @Post()
    public async createBoard(@Body() createBoardDto:CreateBoardDto) {
        try {
            return await this.boardService.createBoard(createBoardDto)
        } catch (error) {
            console.error("controller error:",error)
            return error.message
        }
    }


}