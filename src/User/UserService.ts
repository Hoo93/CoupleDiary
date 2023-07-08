import { Inject, Service } from "typedi";
import { CreateUserDto } from "./dto/createUserDto";
import { User } from "./User";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { UserRepository } from "./UserRepository";

@Service()
export class UserService {
    constructor(
        @Inject()
        private userRepository:UserRepository
    ) {}

    async createUser (createUserDto:CreateUserDto):Promise<User> {
        const user = createUserDto.toEntity();

        const findName = await this.userRepository.findOneBy({name:user.name})
        if (findName) {
            throw new BadRequestError(`name with ${user.name} already exist`)
        }
        
        const findNickname = await this.userRepository.findOneBy({nickname:user.nickname})
        if (findNickname) {
            throw new BadRequestError(`name with ${user.nickname} already exist`)
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


}