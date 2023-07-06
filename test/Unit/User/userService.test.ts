import { UserController } from "../../../src/User/UserController";
import httpMocks = require('node-mocks-http');
import { User } from "../../../src/User/User";
import { UserService } from "../../../src/User/UserService";
import { UserRepository } from "../../../src/User/UserRepository";
import { mock } from "ts-mockito";

const userService = new UserService();
describe("User Service Test", () => {

    test('should have a createUser function', () => {
        expect(typeof userService.createUser).toBe('function');
    })

})


