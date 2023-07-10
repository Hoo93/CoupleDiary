import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { CategoryRepository } from "../../../src/Category/CategoryRepository";
import { CategoryService } from "../../../src/Category/CategoryService"
import { CategoryDto } from "../../../src/Category/dto/CategoryDto";
import { Category } from "../../../src/Category/Category";
import { BadRequestError } from "routing-controllers";

describe('categoryService unit test', () => {

    let categoryService:CategoryService;
    let mockedRepository:CategoryRepository;
    let categoryDto:CategoryDto;

    const now = new Date();

    beforeEach( () => {
        mockedRepository = mock(CategoryRepository);
        categoryService = new CategoryService(instance(mockedRepository))
        
    })

    describe('categoryDto test', () => {
        categoryDto = new CategoryDto();
        categoryDto.name = "test category name"

        it('categortDto.toEntity should call createCategory.', () => {
            const spyCategoryDtoToEntity = jest.spyOn(Category,'createCategory')

            categoryDto.toEntity(now)

            expect(spyCategoryDtoToEntity).toBeCalledTimes(1);
            expect(spyCategoryDtoToEntity).toBeCalledWith(categoryDto.name,now);
        })
    })

    describe('createCategory test', () => {

        categoryDto = new CategoryDto();
        categoryDto.name = "test category name"
        
        let mockedCategoryDto:CategoryDto;
        let category:Category;
        category = categoryDto.toEntity();
        
        beforeEach( () => {
            mockedCategoryDto = mock(CategoryDto);
            when(mockedCategoryDto.toEntity()).thenReturn(category)
            
            
        })
        
        it('createCategory should be a function', () => {
            expect(typeof categoryService.createCategory).toBe('function')
        })

        it('should return category', async () => {
            

            when(mockedRepository.findOneBy({name:category.name})).thenReturn(null)
            when(mockedRepository.save(deepEqual(category))).thenResolve(category)

            const result = await categoryService.createCategory(instance(mockedCategoryDto));

            verify(mockedRepository.findOneBy(deepEqual({name:category.name}))).once()
            verify(mockedRepository.save(deepEqual(category))).once()
            expect(result).toBe(category)

        })

        it('should throw error if same category name in DB', async () => {
            when(mockedRepository.findOneBy(deepEqual({name:category.name}))).thenResolve(new Category())

            await expect( async () => {
                await categoryService.createCategory(instance(mockedCategoryDto))
            }).rejects.toThrowError(new BadRequestError(`category name with ${category.name} already exist`))
            verify(mockedRepository.findOneBy(deepEqual({name:category.name}))).once()
        })



    })
})