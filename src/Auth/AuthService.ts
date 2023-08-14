import { Inject, Service } from "typedi";
import { UserRepository } from "../User/UserRepository";
import * as bcrypt from 'bcrypt';
import { User } from "../User/User";
import { CreateUserDto } from "../User/dto/createUserDto";
import { BadRequestError } from "routing-controllers";
import { JsonWebTokenError } from "jsonwebtoken";
import { generateToken } from "../middleware/jwt";

const saltRounds = 8;

@Service()
export class AuthService {
    constructor (
        @Inject()
        private userRepository:UserRepository
    ) {}

    public async login (name:string,password:string) {
        const findUser = await this.userRepository.findOneBy({name});
        
        if (bcrypt.compare(password,findUser.password)) {
            console.log("login succes")
            return generateToken(name)
        } else {
            console.log("login fail")
            return "login failed"
        }
    }

    public async createUser (createUserDto:CreateUserDto):Promise<User> {
        const user = createUserDto.toEntity();
        user.password = await bcrypt.hash(user.password,saltRounds);

        if (await this.userRepository.findOneBy({name:user.name})) {
            throw new BadRequestError(`name with ${user.name} already exist`) 
           }
        if (await this.userRepository.findOneBy({nickname:user.nickname})) {
            throw new BadRequestError(`nickname with ${user.nickname} already exist`) 
           }   
        
        try {
            const result = await this.userRepository.save(user)
            return result
        } catch(error) {
            console.error("error on save :",error);
            return error.message;
        }
        
    }
}