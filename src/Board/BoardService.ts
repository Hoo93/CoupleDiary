import { Inject, Service } from "typedi";
import { BoardRepository } from "./BoardRepository";
import { CreateBoardDto } from "./dto/createBoardDto";
import { Board } from "./Board";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { UpdateBoardDto } from "./dto/updateBoardDto";

@Service()
export class BoardService {
    constructor (
        @Inject()
        private boardRepository:BoardRepository
    ) {}

    public async createBoard (createBoardDto:CreateBoardDto):Promise<Board> {
        const board = createBoardDto.toEntity();

        try {
            const result = await this.boardRepository.save(board)
            return result
        } catch(error) {
            console.error("error on save :",error);
            return error.message;
        }   
    }

    public async findById (id:number): Promise<Board> {
        const board = await this.boardRepository.findOneBy({id})
        if (!board) {
            throw new NotFoundError(`board with ${id} doesn't exist`)
        }
        return board
    }

    public async findAll():Promise<Board[]> {
        return await this.boardRepository.find();
    }


}