import { IsString, MinLength } from "class-validator";
import { Category } from "../Category";

export class CategoryDto {

    @IsString()
    @MinLength(4,{message:'category name must be longer than 4'})
    name:string

    public toEntity(now:Date = new Date()) {
        const category = Category.createCategory(this.name,now);
        return category;
    }

    
}