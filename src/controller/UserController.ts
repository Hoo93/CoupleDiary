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
    createUser = (
        req:express.Request,
        res:express.Response,
        next:express.NextFunction
    ) => {
        return this.userService.createUser(req,res,next)
    }
}