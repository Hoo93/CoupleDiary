import { UserController } from "../../../src/User/UserController";
import httpMocks = require('node-mocks-http');
import { User } from "../../../src/User/User";
import { UserService } from "../../../src/User/UserService";
import { UserRepository } from "../../../src/User/UserRepository";
import { instance, mock, verify, when } from "ts-mockito";
import { CreateUserDto } from "../../../src/User/dto/createUserDto";
import { nextTick } from "process";
import { Mocker } from "ts-mockito/lib/Mock";
import exp = require("constants");
import { NotFoundError } from "routing-controllers";
import { UpdateUserDto } from "../../../src/User/dto/updateUserDto";
import { deepEqual } from "assert";

let req = httpMocks.createRequest()

describe("User Controller Test", () => {

    let mockedService:UserService;
    let userController:UserController;

    const createUserDto:CreateUserDto = new CreateUserDto();
    createUserDto.name = "create test name",
    createUserDto.nickname = "create test nickname",
    createUserDto.password = "create test password"

    const user = createUserDto.toEntity()
    user.id = 1

    const now = new Date();
    const updateUserDto:UpdateUserDto = new UpdateUserDto();
    updateUserDto.nickname = "update test nickname"
    updateUserDto.password = "update test password"
    
    beforeEach(() => {
        mockedService = mock(UserService);
        userController = new UserController(instance(mockedService));
    })

    describe("createUser method test", () => {

        it('should have a createUser function', async () => {        
            expect(typeof userController.createUser).toBe('function')
        })

        it('should call userService when createUser', async () => {

            const newUser = createUserDto.toEntity()
            when(mockedService.createUser(createUserDto)).thenResolve(newUser)
    
            let userController = new UserController(instance(mockedService));
            req.body = createUserDto
            const result = await userController.createUser(req.body)
    
            verify(mockedService.createUser(createUserDto)).once()
            expect(result).toBe(newUser)
        })

    })

    describe("findUserById method test", () => {

        it('should have a findUserById function', async () => {        
            expect(typeof userController.findUserById).toBe('function')
        })
    
        it('should call userService when findUserById', async () => {
            
            when(mockedService.findUserById(1)).thenResolve(user)
    
            let userController = new UserController(instance(mockedService));
            
            const result = await userController.findUserById(1)
    
            verify(mockedService.findUserById(1)).once()
            expect(result).toBe(user)
        })

    })

    describe("findAllUser method test", () => {

        it('should have a findAllUser function', async () => {        
            expect(typeof userController.findAllUser).toBe('function')
        })
    
        it('should call userService when findAllUser', async () => {
            const users:User[] = [createUserDto.toEntity()]
            
            when(mockedService.findAll()).thenResolve(users)
            
            const result = await userController.findAllUser()
    
            verify(mockedService.findAll()).once()
            expect(result).toBe(users)
        })

    })

    describe("updateUser method test", () => {

        it('should have a updateUser function', async () => {        
            expect(typeof userController.updateUser).toBe('function')
        })

        it('should return updatedUser user.id' , async() => {
            when(mockedService.updateUser(1,updateUserDto)).thenResolve(1)

            const result = await userController.updateUser(1,updateUserDto);
            
            verify(mockedService.updateUser(1,updateUserDto)).once()
            expect(result).toBe(1)
        })
    })

    describe("deleteUser method test", () => {

        it('should have a deleteUser function', async () => {        
            expect(typeof userController.deleteUser).toBe('function')
        })

        it('should return deactivatedUser', async () => {
            user.deactivate()
            when(mockedService.deleteUser(1)).thenResolve(user)
            const deactivatedUser = await userController.deleteUser(1)

            expect(deactivatedUser).toBe(user)
            expect(deactivatedUser.isActivated).toBe(false)
        })
    })

})


