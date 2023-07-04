import { Inject, Service } from "typedi";
import { UserRepository } from "../repository/UserRepository";


@Service()
export class UserService {
    constructor(
        @Inject()
        private userRepository:UserRepository
    ) {}

    
    async createUser (req,res,next) {
        return await this.userRepository.createUser();

    }
}