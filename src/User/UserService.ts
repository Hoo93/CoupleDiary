import { Inject, Service } from "typedi";
// import { UserRepository } from "./UserRepository";
import { CreateUserDto } from "./dto/createUserDto";
import { AppDataSource } from "../data-source";
import { User } from "./User";
import { UserRepository } from "./UserRepository";
import { BadRequestError } from "routing-controllers";
import { loggerMiddleWare } from "../middleware/logger";

@Service()
export class UserService {
    constructor() {}

    async createUser (createUserDto:CreateUserDto):Promise<User> {
        const user = createUserDto.toEntity();
        const findName = await UserRepository.findOneBy({name:user.name})
        const findNickname = await UserRepository.findOneBy({nickname:user.nickname})
        
        // if (findName) {
        //     throw new BadRequestError(`name with ${user.name} already exist`)
        // }
        // if (findNickname) {
        //     throw new BadRequestError(`name with ${user.nickname} already exist`)
        // }

        try {
            const result = await UserRepository.save(createUserDto.toEntity())
            return result
        } catch(error) {
            console.error("error on save :",error)
        }
    }

}