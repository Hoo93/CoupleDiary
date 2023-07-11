import { Repository } from "typeorm";
import { Comment } from "./Comment";
import { AppDataSource } from "../data-source";
import { Service } from "typedi";

@Service()
export class CommentRepository extends Repository<Comment> {
    constructor () {
        super(Comment,AppDataSource.createEntityManager())
    }
}