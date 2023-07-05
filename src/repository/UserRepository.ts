import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User/User";

@Service()
export class UserRepository {
    constructor(
        private userRepository = AppDataSource.getRepository(User)
    ) {}
    
}