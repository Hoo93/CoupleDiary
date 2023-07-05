import { Inject, Service } from "typedi";
import { UserRepository } from "./UserRepository";
import { CreateUserDto } from "./dto/createUserDto";

@Service()
export class UserService {
    constructor(
        @Inject()
        private userRepository:UserRepository
    ) {}

    
    async createUser (createUserDto:CreateUserDto) {
        // const user = await this.userRepository.save(createUserDto)
    }
}