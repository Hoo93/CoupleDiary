import { JsonController } from "routing-controllers";
import { Inject } from "typedi";
import { CommentLikeService } from "./CommenLikeService";

@JsonController('/commentlike')
export class CommentLikeController {
    constructor (
        @Inject()
        private commentLikeService:CommentLikeService
    ) {}
    

}