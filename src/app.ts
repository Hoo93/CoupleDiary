import * as express from 'express';
import Container, { Inject, Service } from 'typedi';
import { AppDataSource } from './data-source';
import { useContainer, useExpressServer } from 'routing-controllers';
import { UserController } from './controller/UserController';

@Service()
export class App {
    private app: express.Application;

    constructor(port) {
        this.app = express();
        this.initializeExpress();
        this.initializeMiddleWare();
        this.listen(port);
    }

    private initializeExpress() {
        try {
            useContainer(Container);
            useExpressServer(this.app,{
                routePrefix:"/api",
                controllers:[UserController],
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





// start express server


export function loggerMiddleWare(req:express.Request,res:express.Response,next:express.NextFunction) {
    console.log(`${req.method} ${req.path}` )
    next();
}