import { Repository } from "typeorm";
import { BoardLike } from "./BoardLike";
import { Board } from "../Board/Board";
import { AppDataSource } from "../data-source";
import { Service } from "typedi";

@Service()
export class BoardLikeRepository extends Repository<BoardLike> {
    constructor () {
        super(BoardLike,AppDataSource.createEntityManager())
    }
}