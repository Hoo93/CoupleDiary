import { IsInt, IsOptional, MinLength } from "class-validator";

export class UpdateBoardDto  {

    @IsOptional()
    @MinLength(1,{message:'board title should be longer than 1'})
    title:string;

    @IsOptional()
    @MinLength(1,{message:'board title should be longer than 1'})
    content:string;

    @IsOptional()
    @IsInt()
    categoryId:number;

    public boardUpdateInfo(updatedAt:Date = new Date()) { 
        const updateUserInfo = {
            title:this.title,
            content:this.content,
            updatedAt:updatedAt
        }
        return updateUserInfo
    }

}