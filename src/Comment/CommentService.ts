import { Inject, Service } from "typedi";
import { CommentRepository } from "./CommentRepository";
import { CreateCommentDto } from "./dto/createCommentDto";
import { Comment } from "./Comment";

@Service()
export class CommentService {
    constructor (
        @Inject()
        private commentRepository:CommentRepository
    ) {}

}