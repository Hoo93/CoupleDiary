import { Inject, Service } from "typedi";
import { CategoryRepository } from "./CategoryRepository";
import { CategoryDto } from "./dto/CategoryDto";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { Category } from "./Category";
import { DeleteResult, UpdateResult } from "typeorm";

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

    async findAll():Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findCategoryById(id:number):Promise<Category> {
        const category:Category = await this.categoryRepository.findOneBy({id});
        if (!category) {
            throw new NotFoundError(`Category with id: ${id} doesn't exist`)
        }
        return category
    }

    public async updateCategory(id:number,categoryDto:CategoryDto):Promise<Number> {
        const category = await this.categoryRepository.findOneBy({id});
        if ( !category ) {
            throw new NotFoundError(`category with id:${id} doesn't exist`)
        }

        const findName = await this.categoryRepository.findOneBy({name:categoryDto.name});
        if ( findName ) {
            throw new BadRequestError(`category name with ${categoryDto.name} already exist`)
        }
        
        const updateResult:UpdateResult = await this.categoryRepository.update(id,categoryDto);
        if ( updateResult.affected === 0 ) {
            throw new BadRequestError('category update fail')
        }
        return id;
    }

    public async deleteCategory(id:number):Promise<DeleteResult> {
        const category:Category = await this.categoryRepository.findOneBy({id});
        if ( !category ) {
            throw new NotFoundError(`category with id:${id} doesn't exist`)
        }

        const deleteResult:DeleteResult = await this.categoryRepository.delete({id});
        if ( deleteResult.affected === 0) {
            throw new BadRequestError('category delete fail')
        }
        return deleteResult
    }


}