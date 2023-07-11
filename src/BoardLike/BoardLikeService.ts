import { Inject, Service } from "typedi";
import { BoardLikeRepository } from "./BoardLikeRepository";
import { CreateBoardLikeDto } from "./dto/createBoardLikeDto";
import { BoardLike } from "./BoardLike";

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
}