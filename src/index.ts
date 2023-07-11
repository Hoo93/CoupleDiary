import { AppDataSource } from "./data-source"
import { App } from './app'

// database connection
AppDataSource
.initialize()
.then(async () => {
    console.log("Data Source has been initialized")
})
.catch(error => console.log(error))

// App start
const app = new App(2220);