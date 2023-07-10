import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { CategoryController } from "../../../src/Category/CategoryController"
import { CategoryService } from "../../../src/Category/CategoryService";
import { CategoryDto } from "../../../src/Category/dto/CategoryDto";
import { Category } from "../../../src/Category/Category";
import exp = require("constants");


describe('categoryController test', () => {
    let categoryController:CategoryController;
    let mockedService:CategoryService;
    
    const now = new Date();
    
    let categoryDto:CategoryDto;
    categoryDto = new CategoryDto();
    categoryDto.name = 'test name'
    
    let category:Category;
    category = categoryDto.toEntity(now);
    category.id = 1

    beforeEach( () => {
        mockedService = mock(CategoryService)
        categoryController = new CategoryController(instance(mockedService))
    })

    describe('createCategory test', () => {

        it('should be a function', async () =>{
            expect(typeof categoryController.createCategory).toBe('function')
        } )

        it('should return category', async () => {
            when(mockedService.createCategory(deepEqual(categoryDto))).thenResolve(category)

            const result = await categoryController.createCategory(categoryDto);

            verify(mockedService.createCategory(deepEqual(categoryDto))).once()
            expect(result).toBe(category)
        })

    })

    describe('findAll test', () => {

        it('should have a findAllUser function', async () => {        
            expect(typeof categoryController.findAll).toBe('function')
        })
    
        it('should call userService when findAllUser', async () => {
            const categories:Category[] = [category,category,category]
            
            when(mockedService.findAll()).thenResolve(categories)
            
            const result = await categoryController.findAll()
    
            verify(mockedService.findAll()).once()
            expect(result).toBe(categories)
        })

    })

    describe("findCategoryById method test", () => {

        it('should have a findUserById function', async () => {        
            expect(typeof categoryController.findCategoryById).toBe('function')
        })
    
        it('should call categoryService when findUserById', async () => {
            
            when(mockedService.findCategoryById(1)).thenResolve(category)
    
            let categoryController = new CategoryController(instance(mockedService));
            
            const result = await categoryController.findCategoryById(1)
    
            verify(mockedService.findCategoryById(1)).once()
            expect(result).toBe(category)
        })

    })

    describe("updateCategory method test", () => {

        it('should have a updateCategory function', async () => {        
            expect(typeof categoryController.updateCategory).toBe('function')
        })

        it('should return updatedUser user.id' , async() => {
            when(mockedService.updateCategory(deepEqual(category.id),deepEqual(categoryDto))).thenResolve(1)

            const result = await categoryController.updateCategory(1,categoryDto);
            
            verify(mockedService.updateCategory(deepEqual(category.id),deepEqual(categoryDto))).once()
            expect(result).toBe(1)
        })
    })
})