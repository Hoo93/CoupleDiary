import { IsOptional, IsString, MinLength, ValidateIf, ValidationError, validate } from "class-validator";
import { Cipher } from "crypto";
import { Column } from "typeorm";

export class UpdateUserDto {
    // IsOptional 하면 있어도 되고 없어도 됨
    @IsOptional()
    @IsString()
    password:string|null;
    
    @IsString()
    @IsOptional()
    @MinLength(2,{message:'nickname should be longer than 2'})
    nickname:string|null;

    public createUpdateInfo(updatedAt:Date = new Date()) { 
        const updateUserInfo = {
            password:this.password,
            nickname:this.nickname,
            updatedAt:updatedAt
        }
        return updateUserInfo
    }

    // async createUpdateInfo2(updatedAt:Date = new Date()): Promise<{ password?: string; nickname?: string,updatedAt:Date}> {
    //     const errors: ValidationError[] = await validate(this);
    //     if (errors.length > 0) {
    //       throw new Error("UpdateUserDto Validation failed");
    //     }
    
    //     const nonNullProps: { password?: string; nickname?: string; updatedAt:Date } = {updatedAt:updatedAt};
    //     if (this.password !== null) {
    //       nonNullProps.password = this.password;
    //     }
    //     if (this.nickname !== null) {
    //       nonNullProps.nickname = this.nickname;
    //     }
        
    //     return nonNullProps;
    //   }
}