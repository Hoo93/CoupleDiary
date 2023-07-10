import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { CategoryRepository } from "../../../src/Category/CategoryRepository";
import { CategoryService } from "../../../src/Category/CategoryService"
import { CategoryDto } from "../../../src/Category/dto/CategoryDto";
import { Category } from "../../../src/Category/Category";

describe('categoryService unit test', () => {

    let categoryService:CategoryService;
    let mockedRepository:CategoryRepository;
    let categoryDto:CategoryDto;
    let mockedCategoryDto:CategoryDto;

    const now = new Date();

    beforeEach( () => {
        mockedRepository = mock(CategoryRepository);
        categoryService = new CategoryService(instance(mockedRepository))
        
    })

    describe('categoryDto test', () => {
        mockedCategoryDto = mock(CategoryDto);
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

        beforeEach( () => {
            mockedCategoryDto = mock(CategoryDto);
            categoryDto = new CategoryDto();
            categoryDto.name = "test category name"
        })
        
        it('createCategory should be a function', () => {
            expect(typeof categoryService.createCategory).toBe('function')
        })

        it('should return category', async () => {
            const category = categoryDto.toEntity();
            when(mockedCategoryDto.toEntity()).thenReturn(category)

            when(mockedRepository.findOneBy({name:category.name})).thenReturn(null)
            when(mockedRepository.save(deepEqual(category))).thenResolve(category)

            const result = await categoryService.createCategory(instance(mockedCategoryDto));

            verify(mockedRepository.findOneBy(deepEqual({name:category.name}))).once()
            verify(mockedRepository.save(deepEqual(category))).once()
            expect(result).toBe(category)


        })



    })
})