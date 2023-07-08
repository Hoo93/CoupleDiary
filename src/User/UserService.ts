import { Inject, Service } from "typedi";
import { CreateUserDto } from "./dto/createUserDto";
import { User } from "./User";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { UserRepository } from "./UserRepository";
import { UpdateUserDto } from "./dto/updateUserDto";
import { UpdateResult } from "typeorm";

@Service()
export class UserService {
    constructor(
        @Inject()
        private userRepository:UserRepository
    ) {}

    async validateName(name:string):Promise<boolean> {
        if (await this.userRepository.findOneBy({name})) {
            return false
        }
        return true
    }

    async validateNickname(nickname:string):Promise<boolean> {
        if (await this.userRepository.findOneBy({nickname})) {
            return false
        }
        return true
    }

    async createUser (createUserDto:CreateUserDto):Promise<User> {
        const user = createUserDto.toEntity();

        if (!this.validateName(user.name)) { throw new BadRequestError(`name with ${user.name} already exist`) }
        if (!this.validateNickname(user.nickname)) { throw new BadRequestError(`name with ${user.nickname} already exist`) }
        
        try {
            const result = await this.userRepository.save(createUserDto.toEntity())
            return result
        } catch(error) {
            console.error("error on save :",error);
            return error.message;
        }
        
    }

    async findUserById (id:number): Promise<User> {
        const user = await this.userRepository.findOneBy({id})
        if (!user) {
            throw new NotFoundError(`user with ${id} doesn't exist`)
        }
        return user
    }

    async findAll():Promise<User[]> {
        return await this.userRepository.find();
    }

    async updateUser(id:number,updateUserDto:UpdateUserDto): Promise<User> {
        let user = await this.userRepository.findOneBy({id});

        if (!user) { throw new NotFoundError(`user id with ${id} doesnt exist`) }
        if (!this.validateName(updateUserDto.name)) { throw new BadRequestError(`name with ${updateUserDto.name} already exist`) }
        if (!this.validateNickname(updateUserDto.nickname)) { throw new BadRequestError(`name with ${updateUserDto.nickname} already exist`) }
        
        const now = new Date();
        user.updatedAt = now;
        user = {...user,...updateUserDto};

        try {
            const updatedUser = await this.userRepository.save(user);
            return updatedUser;
        } catch (error) {
            console.error(error);
            return error.message;
        }

    }


}