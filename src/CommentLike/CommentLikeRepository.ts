import { Repository } from "typeorm";
import { CommentLike } from "./CommentLike";
import { AppDataSource } from "../data-source";
import { Service } from "typedi";

@Service()
export class CommentLikeRepository extends Repository<CommentLike> {
    constructor () {
        super(CommentLike,AppDataSource.createEntityManager())
    }
}