import { Inject, Service } from "typedi";
import { BoardRepository } from "./BoardRepository";
import { CreateBoardDto } from "./dto/createBoardDto";
import { Board } from "./Board";
import { BadRequestError } from "routing-controllers";

@Service()
export class BoardService {
    constructor (
        @Inject()
        private boardRepository:BoardRepository
    ) {}

    async createBoard (createBoardDto:CreateBoardDto):Promise<Board> {
        const board = createBoardDto.toEntity();

        try {
            const result = await this.boardRepository.save(board)
            return result
        } catch(error) {
            console.error("error on save :",error);
            return error.message;
        }
        
    }



}