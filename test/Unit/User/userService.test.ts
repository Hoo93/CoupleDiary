import { User } from "../../../src/User/User";
import { UserService } from "../../../src/User/UserService";
import { UserRepository } from "../../../src/User/UserRepository";
import { deepEqual, instance, mock, spy, when, verify, reset } from "ts-mockito";
import { CreateUserDto } from "../../../src/User/dto/createUserDto";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { UpdateUserDto } from "../../../src/User/dto/updateUserDto";
import exp = require("constants");

describe("User Service Test", () => {

    let mockedRepository:UserRepository;
    let userService:UserService;

    const now = new Date();
    let user:User = User.signup(
        "test name",
        "test nickname",
        "test password",
        now,
        now
        )
    user.id = 1

    
    const createUserDto:CreateUserDto = new CreateUserDto();
    createUserDto.name = "test name";
    createUserDto.nickname = "test nickname",
    createUserDto.password = "test password"

    beforeEach( () => {
        mockedRepository = mock(UserRepository)
        userService = new UserService(instance(mockedRepository))
    })

    describe('userService createUser test', () => {
        it('should be a function', () => {
            expect(typeof userService.createUser).toBe('function');
        })
    
        it('dto.toEntity should call User.signup',() => {
            const spyUserSignUp = jest.spyOn(User,"signup")
    
            createUserDto.toEntity();
            expect(spyUserSignUp).toBeCalledTimes(1)
        })
    
        it('dto.toEntity should return user',() => {
            const result = createUserDto.toEntity();
            
            expect(result.name).toBe(createUserDto.name)
            expect(result.nickname).toBe(createUserDto.nickname)
            expect(result.password).toBe(createUserDto.password)
        })
    
        it('createUser should return user', async () => {
            when(mockedRepository.findOneBy(deepEqual({name:user.name}))).thenReturn(null)
            when(mockedRepository.findOneBy(deepEqual({nickname:user.nickname}))).thenReturn(null)
            when(mockedRepository.save(deepEqual(user))).thenResolve(user)
            
            let mockedDto = mock(CreateUserDto);
            when(mockedDto.toEntity()).thenReturn(user)
            let dto = instance(mockedDto)
    
            const result = await userService.createUser(dto)
            
            expect(dto.toEntity()).toBe(user)
            expect(result).toBe(user)
            verify(mockedRepository.findOneBy(deepEqual({name:user.name}))).once()
            verify(mockedRepository.findOneBy(deepEqual({nickname:user.nickname}))).once()
            verify(mockedRepository.save(user)).once()
        })
    
        it('should throw error if same name in DB', async () => {
            let mockedDto = mock(CreateUserDto);
            when(mockedDto.toEntity()).thenReturn(user)
            let dto = instance(mockedDto)
    
            when(mockedRepository.findOneBy(deepEqual({name:dto.toEntity().name}))).thenResolve(user)
            when(mockedRepository.findOneBy(deepEqual({nickname:dto.toEntity().nickname}))).thenReturn(null)
            
            // 비동기 함수의 에러처리 테스트
            await expect(async () => { 
                await userService.createUser(dto);
            }).rejects.toThrowError(new BadRequestError(`name with ${user.name} already exist`))
            verify(mockedRepository.findOneBy(deepEqual({name:user.name}))).times(1)
            verify(mockedRepository.findOneBy(deepEqual({nickname:user.nickname}))).never()
        })    
    
        it('should throw error if same nickname in DB', async () => {
            let mockedDto = mock(CreateUserDto);
            when(mockedDto.toEntity()).thenReturn(user)
            let dto = instance(mockedDto)
    
            when(mockedRepository.findOneBy(deepEqual({name:dto.toEntity().name}))).thenReturn(null)
            when(mockedRepository.findOneBy(deepEqual({nickname:dto.toEntity().nickname}))).thenResolve(user)
            
            // 비동기 함수의 에러처리 테스트
            await expect(async () => { 
                await userService.createUser(dto);
            }).rejects.toThrowError(new BadRequestError(`nickname with ${user.nickname} already exist`))
            verify(mockedRepository.findOneBy(deepEqual({name:user.name}))).once()
            verify(mockedRepository.findOneBy(deepEqual({nickname:user.nickname}))).once()
        })        
    })

    describe('userService findUserById test', () => {
        
        it('should be a function', async () => {
            expect(typeof userService.findUserById).toBe('function')
        })

        it('should return user', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:1}))).thenResolve(user)
            
            const result = await userService.findUserById(1)
            
            expect(result).toBe(user)
            verify(mockedRepository.findOneBy(deepEqual({id:1}))).once()
        })

        it('should throw NotFoundError', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:1}))).thenReturn(null)
        
            await expect(async () => {
                await userService.findUserById(1)
            }).rejects.toThrowError(NotFoundError)
            verify(mockedRepository.findOneBy(deepEqual({id:1}))).once()
        })

    })

    describe('userService findAll method test' , () => {

        it('should be a function', async () => {
            expect(typeof userService.findAll).toBe('function')
        })

        it('should return User[]', async () => {
            const users:User[] = [createUserDto.toEntity()]

            when(mockedRepository.find()).thenResolve(users)

            const result = await userService.findAll();

            expect(result).toBe(users)
            verify(mockedRepository.find()).once()
        })

    })

    describe('userService updateUser method test' , () => {
        let updateUserDto:UpdateUserDto;
        let updatedUser:User

        beforeEach(() => {
            updateUserDto = new UpdateUserDto;
            updateUserDto.nickname = "test update";
            updateUserDto.password = "test update";
            // updatedUser = {...user,...updateUserDto};
            
        })

        it('should be a function',async () => {
            expect(typeof userService.updateUser).toBe('function')
        })

        it('updateUserDto.toEntity should return updatedUser', () => {
            const now = new Date();
            updatedUser = updateUserDto.toEntity(user,now)

            expect(updatedUser.id).toBe(user.id)
            expect(updatedUser.name).toBe(user.name)
            expect(updatedUser.nickname).toBe(updateUserDto.nickname)
            expect(updatedUser.password).toBe(updateUserDto.password)
            expect(updatedUser.updatedAt).toBe(now)
        })

        it('should call findOneBy twice, call save once, and return updatedUser', async () => {
            const now = new Date();
            updatedUser = updateUserDto.toEntity(user,now)

            when(mockedRepository.findOneBy(deepEqual({id:user.id}))).thenResolve(user)
            when(mockedRepository.findOneBy(deepEqual({nickname:user.nickname}))).thenReturn(null)
            when(mockedRepository.save(deepEqual(updatedUser))).thenResolve(updatedUser)

            const result = await userService.updateUser(1,updateUserDto,now);

            verify(mockedRepository.findOneBy(deepEqual({id:user.id}))).once()
            verify(mockedRepository.findOneBy(deepEqual({nickname:user.nickname}))).once()
            verify(mockedRepository.save(deepEqual(updatedUser))).once()
            expect(result).toBe(updatedUser)
            
        })
    })
        

    

})


