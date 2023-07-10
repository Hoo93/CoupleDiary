import { Inject, Service } from "typedi";
import { CategoryRepository } from "./CategoryRepository";
import { Serializer } from "v8";
import { CategoryDto } from "./dto/CategoryDto";

@Service()
export class CategoryService {
    constructor(
        @Inject()
        private categoryRepository:CategoryRepository
    ) {}

    public async createCategory(categoryDto:CategoryDto) {

    }

}