import { UserController } from "../../../src/User/UserController";
import httpMocks = require('node-mocks-http');
import { User } from "../../../src/User/User";
import { UserService } from "../../../src/User/UserService";
import { UserRepository } from "../../../src/User/UserRepository";
import { deepEqual, instance, mock, spy, when, verify } from "ts-mockito";
import { CreateUserDto } from "../../../src/User/dto/createUserDto";
import exp = require("constants");

let req = httpMocks.createRequest()
let res = httpMocks.createResponse()

const userService = new UserService();



describe("User Service Test", () => {

    it('should have a createUser function', () => {
        expect(typeof userService.createUser).toBe('function');
    })

    it('dto.toEntity should call User.signup',() => {
        const createUserDto:CreateUserDto = new CreateUserDto();
        createUserDto.name = "test name";
        createUserDto.nickname = "test nickname",
        createUserDto.password = "test password"

        const spyUserSignUp = jest.spyOn(User,"signup")

        const result = createUserDto.toEntity();
        expect(spyUserSignUp).toBeCalledTimes(1)
        
    })

    it('dto.toEntity should return user',() => {
        const createUserDto:CreateUserDto = new CreateUserDto();
        createUserDto.name = "test name";
        createUserDto.nickname = "test nickname",
        createUserDto.password = "test password"

        const result = createUserDto.toEntity();
        
        expect(result.name).toBe(createUserDto.name)
        expect(result.nickname).toBe(createUserDto.nickname)
        expect(result.password).toBe(createUserDto.password)
    })

    it('createUser should return user', async () => {
        const now = new Date();
        const user:User = User.signup(
            "test name",
            "test nickname",
            "test password",
            now,
            now
            )
            
        let spiedUserRepo = spy(UserRepository);
        when(spiedUserRepo.save(user)).thenResolve(user)
        
        let mockedDto = mock(CreateUserDto);
        when(mockedDto.toEntity()).thenReturn(user)

        let dto = instance(mockedDto)
        const result = await userService.createUser(dto)

        expect(dto.toEntity()).toBe(user)
        expect(result).toBe(user)
        verify(spiedUserRepo.save(user)).once()
        
    })


})


