import Container, { Service } from 'typedi';
import { useContainer, useExpressServer } from 'routing-controllers';
import { useContainer as rcUseContainer } from 'routing-controllers';
import { useContainer as typeOrmUseContainer } from 'routing-controllers';
import { UserController } from './User/UserController';
import { loggerMiddleWare } from './middleware/logger';
import { Application } from 'express';
import express = require('express')
import { CategoryController } from './Category/CategoryController';
import { CommentController } from './Comment/CommentController';
import { BoardController } from './Board/BoardController';

@Service()
export class App {
    private app: Application;

    constructor(port) {
        this.app = express();
        this.initializeExpress();
        this.initializeMiddleWare();
        this.listen(port);
    }

    private initializeExpress() {
        try {
            useContainer(Container);
            rcUseContainer(Container);
            typeOrmUseContainer(Container);
            useExpressServer(this.app,{
                routePrefix:"/api",
                controllers:[
                    UserController,
                    CategoryController,
                    CommentController,
                    BoardController],
                middlewares:[`${__dirname}/middleware/*.ts`]
            });
        } catch (error) {
            console.log(error)
        }
        
    }

    private initializeMiddleWare() {
        this.app.use(express.json())
        this.app.use(loggerMiddleWare)

    }

    private listen(port:number) {
        this.app.listen(port, () => {
            console.log('######################################')
            console.log(`##### server is running on ${port} ######`)
            console.log('######################################')
        })
    }
}