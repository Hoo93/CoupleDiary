import { Inject, Service } from "typedi";
import { CreateBoardDto } from "./dto/createBoardDto";
import { Board } from "./Board";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { UpdateBoardDto } from "./dto/updateBoardDto";
import { DeleteResult } from "typeorm";
import { BoardRepository } from "./BoardRepository";

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

    public async updateBoard(id:number,updateBoardDto:UpdateBoardDto): Promise<Number> {
        let board = await this.boardRepository.findOneBy({id});
        if (!board) {
            throw new NotFoundError(`board with id:${id} doesn't exist`)
        }
        
        const updateResult = await this.boardRepository.update(board.id,updateBoardDto.boardUpdateInfo());
        if (updateResult.affected === 0) {
            throw new BadRequestError('board update fail')
        }
        return board.id;
    }

    public async deleteBoard(id:number):Promise<DeleteResult> {
        const board:Board = await this.boardRepository.findOneBy({id});
        if ( !board ) {
            throw new NotFoundError(`board with id:${id} doesn't exist`)
        }

        const deleteResult:DeleteResult = await this.boardRepository.delete({id});
        if ( deleteResult.affected === 0) {
            throw new BadRequestError('board delete fail')
        }
        return deleteResult
    }


}