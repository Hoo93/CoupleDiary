import { UserController } from "../../../src/User/UserController";
import httpMocks = require('node-mocks-http');
import { User } from "../../../src/User/User";
import { UserService } from "../../../src/User/UserService";
import { UserRepository } from "../../../src/User/UserRepository";
import { mock, when } from "ts-mockito";

let req = httpMocks.createRequest()
let res = httpMocks.createResponse()

describe("User Controller Test", () => {
    it('should have a createUser function', () => {
        const stubService:UserService = mock(UserService);
        const userController:UserController = new UserController(stubService);
        expect(typeof userController.createUser).toBe('function')
        
        

    })

})


