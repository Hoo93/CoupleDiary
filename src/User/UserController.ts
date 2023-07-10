import { Inject, Service } from 'typedi';
import { UserService } from './UserService';
import { Body, Controller, Delete, Get, JsonController, Param, ParamMetadata, Patch, Post } from 'routing-controllers';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './User';


@JsonController('/user')
@Service()
export class UserController {
    constructor(
        @Inject()
        private userService:UserService
    ) {}

    @Post('/')
    public async createUser(@Body() createUserDto:CreateUserDto) {
        try { 
            return await this.userService.createUser(createUserDto);
        } catch(error) {
            console.error(error);
            return error.message;
        }
        
    }

    @Get()
    public async findAllUser():Promise<User[]> {
        try {
            return await this.userService.findAll();
        } catch(error) {
            console.error(error);
            return error.message;
        }
    }

    @Get('/:id')
    public async findUserById (@Param('id') id:number):Promise<User> { 
        try {
            return await this.userService.findUserById(id);
        } catch(error) {
            console.error(error);
            return error.message;
        }
    }

    @Patch('/:id')
    public async updateUser (
        @Param('id') id:number,
        @Body() updateUserDto:UpdateUserDto):Promise<Number> {
        try {
            return await this.userService.updateUser(id,updateUserDto);
        } catch(error) {
            console.error(error);
            return error.message;
        }
    }

    @Delete('/:id')
    public async deleteUser (@Param('id') id:number) {
        try {
            return await this.userService.deleteUser(id)
        } catch(error) {
            console.error(error);
            return error.message;
        }
    }
}