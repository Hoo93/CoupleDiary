import { Body, JsonController, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { CategoryService } from "./CategoryService";
import { CategoryDto } from "./dto/CategoryDto";
import { Collection } from "typeorm";

@JsonController('category')
@Service()
export class CategoryController {
    constructor(
        @Inject()
        private categoryService:CategoryService
    ) {}

    @Post('/')
    async createCategory(@Body() categoryDto:CategoryDto) {
        try {
            return await this.categoryService.createCategory(categoryDto);
        } catch (e) {
            console.error(e);
            return e.message;
        }

    }


}