import { Inject, Service } from "typedi";
import { CommentRepository } from "./CommentRepository";
import { CreateCommentDto } from "./dto/createCommentDto";
import { Comment } from "./Comment";
import { NotFoundError } from "routing-controllers";

@Service()
export class CommentService {
    constructor (
        @Inject()
        private commentRepository:CommentRepository
    ) {}
    
    public async createComment (createCommentDto:CreateCommentDto):Promise<Comment> {
        const comment = createCommentDto.toEntity();

        try {
            const result = await this.commentRepository.save(comment)
            return result
        } catch(error) {
            console.error("error on save :",error);
            return error.message;
        }   
    }

    public async findById (id:number): Promise<Comment> {
        const comment = await this.commentRepository.findOneBy({id})
        if (!comment) {
            throw new NotFoundError(`comment with ${id} doesn't exist`)
        }
        return comment
    }

    public async findAll():Promise<Comment[]> {
        return await this.commentRepository.find();
    }

}