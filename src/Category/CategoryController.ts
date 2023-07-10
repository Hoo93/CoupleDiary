import { Body, Get, JsonController, Param, Patch, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { CategoryService } from "./CategoryService";
import { CategoryDto } from "./dto/CategoryDto";
import { Collection } from "typeorm";
import { Category } from "./Category";

@JsonController('/category')
@Service()
export class CategoryController {
    constructor(
        @Inject()
        private categoryService:CategoryService
    ) {}

    @Post()
    public async createCategory(@Body() categoryDto:CategoryDto) {
        try {
            return await this.categoryService.createCategory(categoryDto);
        } catch (e) {
            console.error(e);
            return e.message;
        }
    }

    @Get()
    public async findAll():Promise<Category[]> {
        return await this.categoryService.findAll();
    }

    @Get('/:id')
    public async findCategoryById(@Param('id') id:number):Promise<Category> {
        return await this.categoryService.findCategoryById(id);
    }

    @Patch('/:id')
    public async updateCategory(
        @Param('id') id:number,
        @Body() categoryDto:CategoryDto):Promise<Number> {
            try {
                return await this.categoryService.updateCategory(id,categoryDto);
            } catch(error) {
                console.error(error);
                return error.message;
            }
        }


}