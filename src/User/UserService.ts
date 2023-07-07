import { Inject, Service } from "typedi";
import { CreateUserDto } from "./dto/createUserDto";
import { User } from "./User";
import { BadRequestError } from "routing-controllers";
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
        console.log(findName)
        if (findName) {
            console.log("should throw error name")
            throw new BadRequestError(`name with ${user.name} already exist`)
        }
        
        const findNickname = await this.userRepository.findOneBy({nickname:user.nickname})
        console.log(findNickname)
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