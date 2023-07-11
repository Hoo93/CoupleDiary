import { JsonController } from "routing-controllers";
import { Inject, Service } from "typedi";
import { CommentService } from "./CommentService";


@JsonController('/comment')
@Service()
export class CommentController {
    constructor (
        @Inject()
        private commentService:CommentService
    ) {}

}