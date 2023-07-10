import { Inject, Service } from "typedi";
import { BoardRepository } from "./BoardRepository";

@Service()
export class BoardService {
    constructor (
        @Inject()
        private boardRepository:BoardRepository
    ) {}

}