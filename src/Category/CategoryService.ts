import { Inject, Service } from "typedi";
import { CategoryRepository } from "./CategoryRepository";
import { Serializer } from "v8";
import { CategoryDto } from "./dto/CategoryDto";
import { BadRequestError } from "routing-controllers";
import { copyFileSync } from "fs";

@Service()
export class CategoryService {
    constructor(
        @Inject()
        private categoryRepository:CategoryRepository
    ) {}

    public async createCategory(categoryDto:CategoryDto) {
        
        const category = categoryDto.toEntity();
        
        if (await this.categoryRepository.findOneBy({name:category.name}) ) {
            throw new BadRequestError(`category name with ${category.name} already exist`)
        }

        try {
            const result = await this.categoryRepository.save(category);
            return result
        } catch (error) {
            console.error(error);
            return error.message
        }

    }

}