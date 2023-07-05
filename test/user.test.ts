import { UserController } from "../src/controller/UserController";
import { User } from "../src/entity/User/User";
import { AppDataSource } from "../src/data-source";
import { Repository } from "typeorm";
import { UserService } from "../src/service/UserService";
import httpMocks = require('node-mocks-http');

describe("User Controller Test", () => {
    test('should have called with userService', () => {
        const userController = new UserController();


        



    })

})


