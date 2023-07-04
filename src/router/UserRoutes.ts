import * as express from 'express';
import Container, { Inject, Service } from 'typedi';
import { UserController } from '../controller/userController';
import { In } from 'typeorm';
import { User } from '../entity/User';

// export const userRoutes = express.Router();
// userRoutes.use(function timLog(req,res,next) {
//     console.log('Time: ',Date.now());
//     next()
// })

// userRoutes.get('/', sayHello)
// userRoutes.get('/hi', Hello)
// userRoutes.get('/hi2', userController.sayHello)
// userRoutes.get('/:id',(req,res) =>{
//     res.send(`${req.params.id}`)
// })

@Service()
export class UserRoutes {
    private path = '/api/user'
    public router;
    constructor(@Inject() userController:UserController) {
        this.router = express.Router();
        this.router.get(this.path,userController.sayHello)
        this.router.get(this.path + '/signup',userController.createUser)
        
    }

    // private initializeRoutes() {
        
    //     this.router.get(this.path,this.userController.createUser)
    // }

}

