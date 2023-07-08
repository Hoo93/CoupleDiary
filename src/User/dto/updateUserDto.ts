import { IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MinLength(4,{message:'name should be longer than 4'})
    name:string;

    @IsString()
    password:string;

    @IsString()
    @MinLength(2,{message:'name should be longer than 2'})
    nickname:string;
}