import { UserController } from "../../../src/User/UserController";
import httpMocks = require('node-mocks-http');
import { User } from "../../../src/User/User";
import { UserService } from "../../../src/User/UserService";
import { UserRepository } from "../../../src/User/UserRepository";
import { instance, mock, verify, when } from "ts-mockito";
import { CreateUserDto } from "../../../src/User/dto/createUserDto";
import { nextTick } from "process";
import { Mocker } from "ts-mockito/lib/Mock";

let req = httpMocks.createRequest()
let res = httpMocks.createResponse()
let next = jest.fn()


const createUserDto:CreateUserDto = new CreateUserDto();
createUserDto.name = "test name",
createUserDto.nickname = "test nickname",
createUserDto.password = "test password"

describe("User Controller Test", () => {

    beforeEach(() => {
        
    })
    it('should have a createUser function', () => {        
        let stubService = mock(UserService);
        let userController = new UserController(instance(stubService));
        expect(typeof userController.createUser).toBe('function')
    })

    it('should haveCalledWith a userService', () => {

        let stubService = mock(UserService);
        const newUser = Promise.resolve(createUserDto.toEntity())
        when(stubService.createUser(createUserDto)).thenResolve(new User())
        let userController = new UserController(instance(stubService));
        req.body = createUserDto
        userController.createUser(req.body)

        verify(stubService.createUser(createUserDto)).once()
    })

})


