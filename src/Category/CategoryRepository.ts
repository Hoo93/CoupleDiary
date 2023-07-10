import { Repository } from "typeorm";
import { Category } from "./Category";
import { AppDataSource } from "../data-source";
import { Service } from "typedi";

@Service()
export class CategoryRepository extends Repository<Category> {
    constructor() {
        super(Category,AppDataSource.createEntityManager());
    }
}