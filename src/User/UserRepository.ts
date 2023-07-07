import Container, { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { User } from "./User";
import { DataSource, Repository } from "typeorm";
import { useContainer } from "routing-controllers";

@Service()
export class UserRepository extends Repository<User> {
    constructor() {
        super(User,AppDataSource.createEntityManager());
    }
}


