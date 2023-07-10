import { JsonController } from "routing-controllers";
import { Inject, Service } from "typedi";
import { BoardService } from "./boardService";

@JsonController('board')
@Service()
export class BoardController {
    constructor (
        @Inject()
        private boardService:BoardService
    ) {}

    
}