import { JsonController } from "routing-controllers";
import { Inject, Service } from "typedi";
import { CategoryService } from "./CategoryService";

@JsonController('category')
@Service()
export class CategoryController {
    constructor(
        @Inject() categoryService:CategoryService
    ) {}


}