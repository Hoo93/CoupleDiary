import { Inject, Service } from "typedi";
import { CommentLikeRepository } from "./CommentLikeRepository";


@Service()
export class CommentLikeService {
    constructor(
        @Inject()
        private commentLikeRepository:CommentLikeRepository
    ) {}

}