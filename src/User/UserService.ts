import { Inject, Service } from "typedi";
import { CreateUserDto } from "./dto/createUserDto";
import { User } from "./User";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { UserRepository } from "./UserRepository";
import { UpdateUserDto } from "./dto/updateUserDto";
import * as bcrypt from 'bcrypt';

const saltRounds = 8;

@Service()
export class UserService {
    constructor(
        @Inject()
        private userRepository:UserRepository
    ) {}

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

    public async findUserById (id:number): Promise<User> {
        const user = await this.userRepository.findOneBy({id})
        if (!user) {
            throw new NotFoundError(`user with ${id} doesn't exist`)
        }
        return user
    }

    public async findAll():Promise<User[]> {
        return await this.userRepository.find();
    }

    public async updateUser(id:number,updateUserDto:UpdateUserDto): Promise<Number> {
        let user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw new NotFoundError(`user with id:${id} doesn't exist`)
        }

        if (updateUserDto.nickname && updateUserDto.nickname !== null ) {
            let findNickname = await this.userRepository.findOneBy({nickname:updateUserDto.nickname})
            if ( findNickname && findNickname.id !== user.id) {
                throw new BadRequestError(`nickname with ${updateUserDto.nickname} already exist`) 
            } 
        }
        
        const updateResult = await this.userRepository.update(user.id,updateUserDto.createUpdateInfo());
        if (updateResult.affected === 0) {
            throw new BadRequestError('user update fail')
        }
        return user.id;
    
    }

    public async deleteUser(id:number):Promise<User> {
        let user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw new NotFoundError(`user with id:${id} doesn't exist`)
        }

        user.deactivate()
        const deactivatedUser = await this.userRepository.save(user);
        return deactivatedUser;
    }


}