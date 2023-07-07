import Container, { Inject, Service } from "typedi";
import { CreateUserDto } from "./dto/createUserDto";
import { AppDataSource } from "../data-source";
import { User } from "./User";
import { BadRequestError } from "routing-controllers";
import { loggerMiddleWare } from "../middleware/logger";
import { NextFunction } from "express";
import { In, Repository } from "typeorm";
import { UserRepository } from "./UserRepository";

@Service()
export class UserService {
    constructor(
        @Inject()
        private userRepository:UserRepository
    ) {}

    async createUser (createUserDto:CreateUserDto,next:NextFunction):Promise<User> {
        const user = createUserDto.toEntity();
        
        const findName = await this.userRepository.findOneBy({name:user.name})
        if (findName) {
            console.log("should throw error name")
            throw new BadRequestError(`name with ${user.name} already exist`)
        }

        const findNickname = await this.userRepository.findOneBy({nickname:user.nickname})
        if (findNickname) {
            console.log("should throw error nickname")
            throw new BadRequestError(`name with ${user.nickname} already exist`)
        }

        try {
            const result = await this.userRepository.save(createUserDto.toEntity())
            return result
        } catch(error) {
            console.error("error on save :",error)
        }
        
    }

}