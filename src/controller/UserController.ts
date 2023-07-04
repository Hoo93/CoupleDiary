import * as express from 'express';
import { Inject, Service } from 'typedi';
import { UserService } from '../service/UserService';
import { Controller, Get } from 'routing-controllers';


@Controller('/user')
@Service()
export class UserController {

    constructor(
        @Inject()
        private userService:UserService
    ) {}

    @Get('/signup')
    public async createUser(
        req:express.Request,
        res:express.Response,
        next:express.NextFunction
    ) {
        return await this.userService.createUser(req,res,next)
    }
}