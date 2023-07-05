import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { User } from "./User";
import { Repository } from "typeorm";

@Service()
export class UserRepository extends Repository<User>{
    // constructor(
    //     private userRepository = AppDataSource.getRepository(User)
    // ) {}
    
}