import { Unique } from "typeorm"
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";
import { User } from "../User";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4,{message:'name should be longer than 4'})
    name:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2,{message:'name should be longer than 2'})
    nickname:string;

    public toEntity():User {
        const now = new Date();
        return User.signup(
            this.name,
            this.nickname,
            this.password,
            now,
            now
        )

    }
}