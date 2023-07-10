import { Inject, Service } from "typedi";
import { CategoryRepository } from "./CategoryRepository";
import { Serializer } from "v8";

@Service()
export class CategoryService {
    constructor(
        @Inject() categoryRepository:CategoryRepository
    ) {}

}