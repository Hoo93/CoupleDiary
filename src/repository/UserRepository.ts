import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

@Service()
export class UserRepository {
    constructor(
        private userRepository = AppDataSource.getRepository(User)
    ) {}

    async createUser(){
        const result = await 'Ang';
        return result
    }

    
}