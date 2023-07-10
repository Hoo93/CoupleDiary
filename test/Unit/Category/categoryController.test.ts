import { instance, mock } from "ts-mockito";
import { CategoryController } from "../../../src/Category/CategoryController"
import { CategoryService } from "../../../src/Category/CategoryService";


describe('categoryController test', () => {
    let categoryController:CategoryController;
    let mockedService:CategoryService;

    beforeEach( () => {
        mockedService = mock(CategoryService)
        categoryController = new CategoryController(instance(mockedService))
    })

    describe('createCategory test', () => {

        it('should be a function', async () =>{
            expect(typeof categoryController.createCategory).toBe('function')
        } )

    })
})