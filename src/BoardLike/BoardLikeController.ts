import { Inject, Service } from "typedi";
import { BoardLikeService } from "./BoardLikeService";


@Service()
export class BoadrLikeController {
    constructor (
        @Inject()
        private boardLikeService:BoardLikeService
    ) {}
    
}