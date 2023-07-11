import { Inject, Service } from "typedi";
import { BoardLikeRepository } from "./BoardLikeRepository";
import { CreateBoardLikeDto } from "./dto/createBoardLikeDto";
import { BoardLike } from "./BoardLike";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { DeleteResult } from "typeorm";

@Service()
export class BoardLikeService {
    constructor (
        @Inject()
        private boardLikeRepository:BoardLikeRepository
    ) {}

    public async createBoardLike (CreateBoardLikeDto:CreateBoardLikeDto):Promise<BoardLike> {
        const boardLike = CreateBoardLikeDto.toEntity();

        try {
            const result = await this.boardLikeRepository.save(boardLike)
            return result
        } catch(error) {
            console.error("error on save :",error);
            return error.message;
        }   
    }

    public async findById (id:number): Promise<BoardLike> {
        const boardLike = await this.boardLikeRepository.findOneBy({id})
        if (!boardLike) {
            throw new NotFoundError(`boardLike with ${id} doesn't exist`)
        }
        return boardLike
    }

    public async findAll():Promise<BoardLike[]> {
        return await this.boardLikeRepository.find();
    }

    public async deleteBoardLike(id:number):Promise<DeleteResult> {
        const boardLike:BoardLike = await this.boardLikeRepository.findOneBy({id});
        if ( !boardLike ) {
            throw new NotFoundError(`boardLike with id:${id} doesn't exist`)
        }

        const deleteResult:DeleteResult = await this.boardLikeRepository.delete({id});
        if ( deleteResult.affected === 0) {
            throw new BadRequestError('boardLike delete fail')
        }
        return deleteResult
    }

}