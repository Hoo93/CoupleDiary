import * as express from 'express';
import { Inject, Service } from 'typedi';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { DataSource } from 'typeorm';
import { UserService } from '../repository/UserService';
import { Controller, Get } from 'routing-controllers';


@Controller('/user')
export class UserController {

    constructor(
        @Inject()
        private userService:UserService
    ) {}
    
    @Get('/hi')
    sayHello = async (
        req:express.Request,
        res:express.Response,
        next:express.NextFunction
    ) => {
        res.send("Hi hi hi hi hi hi!")
    }

    createUser = (
        req:express.Request,
        res:express.Response,
        next:express.NextFunction
    ) => {
        return this.userService.createUser(req,res,next)
    }
}