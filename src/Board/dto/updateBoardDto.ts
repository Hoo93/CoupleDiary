import { IsInt, MinLength } from "class-validator";

export class UpdateBoardDto  {

    @MinLength(1,{message:'board title should be longer than 1'})
    title:string;

    @MinLength(1,{message:'board title should be longer than 1'})
    content:string;

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