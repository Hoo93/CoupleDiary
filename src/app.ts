import * as express from 'express';
import Container, { Inject, Service } from 'typedi';
import { UserRoutes } from './router/user.routes';
import { AppDataSource } from './data-source';

@Service()
export class App {
    private app: express.Application;
    private userRoutes:UserRoutes = Container.get(UserRoutes);

    constructor(port) {
        this.app = express();
        this.initializeMiddleWare();
        this.listen(port);
        this.app.use('/',this.userRoutes.router)
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