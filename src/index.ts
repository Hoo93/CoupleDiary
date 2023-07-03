import { AppDataSource } from "./data-source"
import { Request, Response } from "express"
import * as express from 'express'

// database connection
AppDataSource
    .initialize()
    .then(async () => {
        console.log("Data Source has been initialized")
        })
    .catch(error => console.log(error))

// create and setup express app
const app = express();
const port = 2220;
app.use(express.json())

app.get('/',(req:Request,res:Response) => {
    res.send('Hello World')
})

// start express server
app.listen(port, () => {
    console.log('######################################')
    console.log(`##### server is running on ${port} ######`)
    console.log('######################################')
})
