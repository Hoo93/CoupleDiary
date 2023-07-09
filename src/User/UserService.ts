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

    async createUser (createUserDto:CreateUserDto):Promise<User> {
        const user = createUserDto.toEntity();

        if (await this.userRepository.findOneBy({name:user.name})) {
            throw new BadRequestError(`name with ${user.name} already exist`) 
           }
        if (await this.userRepository.findOneBy({nickname:user.nickname})) {
            throw new BadRequestError(`nickname with ${user.nickname} already exist`) 
           }   
        
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

    async updateUser(id:number,updateUserDto:UpdateUserDto,updatedAt:Date): Promise<User> {
        let user = await this.userRepository.findOneBy({id});

        let findNickname = await this.userRepository.findOneBy({nickname:user.nickname})
        if (findNickname) {
             throw new BadRequestError(`nickname with ${updateUserDto.nickname} already exist`) 
            }
        
        const updatedUser = updateUserDto.toEntity(user,updatedAt)

        try {
            const newUser = await this.userRepository.save(updatedUser);
            return newUser;
        } catch (error) {
            console.error(error);
            return error.message;
        }

    }


}