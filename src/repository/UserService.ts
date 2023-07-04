import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";


@Service()
export class UserService {
    constructor(
        private userRepo = AppDataSource.getRepository(User)
    ) {}

    
    async createUser (req,res,next) {
        await this.userRepo.create();
    }
}