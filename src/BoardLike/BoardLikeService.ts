import { Inject, Service } from "typedi";
import { Board } from "../Board/Board";
import { BoardLikeRepository } from "./BoardLikeRepository";

@Service()
export class BoardLikeService {
    constructor (
        @Inject()
        private boardLikeRepository:BoardLikeRepository
    ) {}
}