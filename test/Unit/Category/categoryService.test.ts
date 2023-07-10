import { instance, mock } from "ts-mockito";
import { CategoryRepository } from "../../../src/Category/CategoryRepository";
import { CategoryService } from "../../../src/Category/CategoryService"
import exp = require("constants");

describe('categoryService unit test', () => {

    let categoryService:CategoryService;
    let mockedRepository:CategoryRepository;

    beforeEach( () => {
        mockedRepository = mock(CategoryRepository);
        categoryService = new CategoryService(instance(mockedRepository))
    })

    describe('createCategory test', () => {
        
        it('createCategory should be a function', () => {
            expect(typeof categoryService.createCategory).toBe('function')
        })

        

    })
})