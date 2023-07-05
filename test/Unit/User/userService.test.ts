import { UserController } from "../../../src/User/UserController";
import httpMocks = require('node-mocks-http');
import { User } from "../../../src/User/User";
import { UserService } from "../../../src/User/UserService";
import { UserRepository } from "../../../src/User/UserRepository";
import { mock } from "ts-mockito";

let req = httpMocks.createRequest()
let res = httpMocks.createResponse()

describe("User Service Test", () => {
    test('should have called with userService', () => {
        const stubRepository:UserRepository = mock(UserRepository);
        const userService:UserService = new UserService(stubRepository);

        expect(typeof userService.createUser).toBe('function');
    })

})


