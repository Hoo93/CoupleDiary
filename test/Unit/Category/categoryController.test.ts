import { instance, mock, when } from "ts-mockito";
import { CategoryController } from "../../../src/Category/CategoryController"
import { CategoryService } from "../../../src/Category/CategoryService";
import { CategoryDto } from "../../../src/Category/dto/CategoryDto";
import { Category } from "../../../src/Category/Category";


describe('categoryController test', () => {
    let categoryController:CategoryController;
    let mockedService:CategoryService;
    let categoryDto:CategoryDto;
    let category:Category;
    const now = new Date();

    beforeEach( () => {
        mockedService = mock(CategoryService)
        categoryController = new CategoryController(instance(mockedService))
        categoryDto = new CategoryDto();
        categoryDto.name = 'test name'

        category = categoryDto.toEntity(now);
        category.id = 1

    })

    describe('createCategory test', () => {

        it('should be a function', async () =>{
            expect(typeof categoryController.createCategory).toBe('function')
        } )

        it('should return category', async () => {
            when(mockedService.createCategory(categoryDto)).thenResolve(category)
        })

    })
})