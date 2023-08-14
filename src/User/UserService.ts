import { Inject, Service } from "typedi";
import { CreateUserDto } from "./dto/createUserDto";
import { User } from "./User";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { UserRepository } from "./UserRepository";
import { UpdateUserDto } from "./dto/updateUserDto";

@Service()
export class UserService {
    constructor(
        @Inject()
        private userRepository:UserRepository
    ) {}

    

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