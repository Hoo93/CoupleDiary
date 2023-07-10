import { IsString, MinLength } from "class-validator";
import { User } from "../User";

export class UpdateUserDto {

    @IsString()
    password:string;

    @IsString()
    @MinLength(2,{message:'name should be longer than 2'})
    nickname:string;

    public createUpdateInfo(updatedAt:Date = new Date()) { 
        const updateUserInfo = {
            password:this.password,
            nickname:this.nickname,
            updatedAt:updatedAt
        }

        return updateUserInfo
    }
}