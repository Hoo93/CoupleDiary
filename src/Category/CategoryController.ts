import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { CategoryService } from "./CategoryService";
import { CategoryDto } from "./dto/CategoryDto";
import { Collection } from "typeorm";
import { Category } from "./Category";

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

    @Get('/')
    async findAll():Promise<Category[]> {
        return await this.categoryService.findAll();
    }

    @Get('/:id')
    async findCategoryById(@Param('id') id:number):Promise<Category> {
        return await this.categoryService.findCategoryById(id);
    }


}