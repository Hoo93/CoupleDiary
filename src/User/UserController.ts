import * as express from 'express';
import { Inject, Service } from 'typedi';
import { UserService } from './UserService';
import { Body, Controller, Get, JsonController, Param, Patch, Post } from 'routing-controllers';
import { CreateUserDto } from './dto/createUserDto';


@JsonController('/user')
@Service()
export class UserController {
    constructor(
        @Inject()
        private userService:UserService
    ) {}

    @Post('/signup')
    public async createUser(@Body() createUserDto:CreateUserDto) {
        try { 
            return await this.userService.createUser(createUserDto);
        } catch(error) {
            console.error(error);
            return error.message;
        }
        
    }

    @Get()
    public async findAllUser() {
        try {
            return await this.userService.findAll();
        } catch(error) {
            console.error(error);
            return error.message;
        }
    }

    @Get('/:id')
    public async findUserById (@Param('id') id:number) { 
        try {
            return await this.userService.findUserById(id);
        } catch(error) {
            console.error(error);
            return error.message;
        }
    }

    @Patch('/:id')
    public async updateUser (@Param('id') id:number) {
        
    }
}