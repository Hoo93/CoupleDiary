import { UserController } from "../../../src/User/UserController";
import httpMocks = require('node-mocks-http');
import { User } from "../../../src/User/User";
import { UserService } from "../../../src/User/UserService";
import { UserRepository } from "../../../src/User/UserRepository";
import { mock, when } from "ts-mockito";
import { CreateUserDto } from "../../../src/User/dto/createUserDto";
import { nextTick } from "process";

let req = httpMocks.createRequest()
let res = httpMocks.createResponse()
let next = jest.fn()

const userService:UserService = new UserService();
userService.createUser = jest.fn()

describe("User Controller Test", () => {
    it('should have a createUser function', () => {
        const stubService:UserService = mock(UserService);
        const userController:UserController = new UserController(stubService);
        expect(typeof userController.createUser).toBe('function')
    })

    it('should haveCalledWith a userService', () => {
        const userController:UserController = new UserController(userService);
        const createUserDto:CreateUserDto = {
            name:"test name",
            nickname:"test nickname",
            password:"test password"
        } as CreateUserDto

        req.body = createUserDto
        userController.createUser(req.body,next)

        expect(userService.createUser).toHaveBeenCalledWith(req.body,next)
        expect(userService.createUser).toBeCalledTimes(1)
    })

})


