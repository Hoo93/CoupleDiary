import { Service } from "typedi";
import { Repository } from "typeorm";
import { Board } from "./Board";
import { AppDataSource } from "../data-source";

@Service()
export class BoardRepository extends Repository<Board> {
    constructor () {
        super(Board,AppDataSource.createEntityManager())
    }
}