import { Inject, Service } from "typedi";
import { CommenLikeRepository } from "./CommenLikeRepository";


@Service()
export class CommentLikeService {
    constructor(
        @Inject()
        private commentLikeRepository:CommenLikeRepository
    ) {}

}