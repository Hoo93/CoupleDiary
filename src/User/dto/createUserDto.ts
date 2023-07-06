import { Unique } from "typeorm"
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { User } from "../User";

@Unique(['username','nickname'])
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
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