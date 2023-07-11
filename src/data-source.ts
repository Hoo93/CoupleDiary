import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./User/User"
import { Category } from "./Category/Category"
import { Board } from "./Board/Board"
import { Comment } from "./Comment/Comment"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "sanghoopark",
    password: "hoo",
    database: "couple_diary",
    synchronize: true,
    logging: false,
    entities: [User,Category,Board,Comment],
    migrations: [],
    subscribers: [],
})


