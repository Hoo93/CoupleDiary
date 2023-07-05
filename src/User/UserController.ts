import * as express from 'express';
import { Inject, Service } from 'typedi';
import { UserService } from './UserService';
import { Body, Controller, Get, JsonController, Post } from 'routing-controllers';
import { CreateUserDto } from './dto/createUserDto';


@JsonController('/user')
@Service()
export class UserController {
    constructor(
        @Inject()
        private userService:UserService
    ) {}

    @Post('/signup')
    public async createUser(
        @Body() createUserDto:CreateUserDto
    ) {
        return await this.userService.createUser(createUserDto)
    }
}