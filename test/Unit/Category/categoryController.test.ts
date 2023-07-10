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
})