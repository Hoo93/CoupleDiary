import * as express from 'express';
import { Inject, Service } from 'typedi';
import { UserRepository } from '../models/user.model';

@Service()
export class UserController {
    @Inject()
    userRepo:UserRepository;

    public sayHello = async (
        req:express.Request,
        res:express.Response,
        next:express.NextFunction
    ) => {
        res.send("Hi hi hi hi hi hi!")
    }

    public createUser = (
        req:express.Request,
        res:express.Response,
        next:express.NextFunction
    ) => {
        this.userRepo.createUser(req,res,next);
    }
}