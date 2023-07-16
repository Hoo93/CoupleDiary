import { Body, JsonController, Post } from "routing-controllers";
import { CreateUserDto } from "../User/dto/createUserDto";
import { Inject } from "typedi";
import { AuthService } from "./AuthService";

@JsonController('/auth')
export class AuthController {
    constructor ( 
        @Inject()
        private authService: AuthService
    ) {}

    @Post('/')
    public async createUser(@Body() createUserDto:CreateUserDto) {
        try { 
            return await this.authService.createUser(createUserDto);
        } catch(error) {
            console.error(error);
            return error.message;
        }

    }

    @Post('/signin')
    public async ligin(@Body() createUserDto:CreateUserDto) {
        try { 
            return await this.authService.login(createUserDto.name,createUserDto.password);
        } catch(error) {
            console.error(error);
            return error.message;
        }

    }

}
