import { Inject, Service } from "typedi";
// import { UserRepository } from "./UserRepository";
import { CreateUserDto } from "./dto/createUserDto";
import { AppDataSource } from "../data-source";
import { User } from "./User";
import { UserRepository } from "./UserRepository";
import { ConnectionCheckOutFailedEvent, Repository } from "typeorm";

@Service()
export class UserService {
    constructor() {}

    async createUser (createUserDto:CreateUserDto):Promise<User> {
        const result = await UserRepository.save(createUserDto.toEntity())
        return result
    }
}