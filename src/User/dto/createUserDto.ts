import { Unique } from "typeorm"
import { IsInt, IsNotEmpty, IsString } from "class-validator";

@Unique(['username','nickname'])
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    nickname:string;
}