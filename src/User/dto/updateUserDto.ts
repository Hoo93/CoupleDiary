import { IsString, MinLength } from "class-validator";
import { User } from "../User";

export class UpdateUserDto {

    @IsString()
    password:string;

    @IsString()
    @MinLength(2,{message:'name should be longer than 2'})
    nickname:string;

    // public toEntity(user:User,updatedAt:Date):User { 
    //     const updateUserDto = {
    //         password:this.password,
    //         nickname:this.nickname,
    //         updatedAt:updatedAt
    //     }

    //     const updatedUser:User = {
    //         ...user,
    //         ...updateUserDto,
    //     }
    //     return updatedUser
    // }
}