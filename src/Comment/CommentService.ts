import { Inject, Service } from "typedi";
import { CommentRepository } from "./CommentRepository";

@Service()
export class CommentService {
    constructor (
        @Inject()
        private commentRepository:CommentRepository
    ) {}


}