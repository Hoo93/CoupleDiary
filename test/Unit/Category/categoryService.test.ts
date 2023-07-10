import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { CategoryRepository } from "../../../src/Category/CategoryRepository";
import { CategoryService } from "../../../src/Category/CategoryService"
import { CategoryDto } from "../../../src/Category/dto/CategoryDto";
import { Category } from "../../../src/Category/Category";
import { BadRequestError, NotFoundError } from "routing-controllers";
import exp = require("constants");

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
        category.id = 1
        
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

    describe('categoryService findCategoryById test', () => {

        let category:Category = new Category();
        category.id = 1;
        category.name = "test category name";
        category.createdAt = now;
        category.updatedAt = now;

        it('should be a fucntion', async () => {
            expect(typeof categoryService.findCategoryById).toBe('function');
        })

        it('should return category', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:category.id}))).thenResolve(category)

            const result = await categoryService.findCategoryById(1)

            verify(mockedRepository.findOneBy(deepEqual({id:category.id}))).once()
            expect(result).toBe(category)
        })

        it('should throw NotFoundError', async () => {
            when(mockedRepository.findOneBy(deepEqual({id:1}))).thenReturn(null)
        
            await expect(async () => {
                await categoryService.findCategoryById(1)
            }).rejects.toThrowError(new NotFoundError(`Category with id: ${1} doesn't exist`))
            verify(mockedRepository.findOneBy(deepEqual({id:1}))).once()
        })
    })

    describe('categoryService findAll test', () => {

        let category:Category = new Category();
        category.id = 1;
        category.name = "test category name";
        category.createdAt = now;
        category.updatedAt = now;

        it('should be a fucntion', async () => {
            expect(typeof categoryService.findAll).toBe('function');
        })

        it('should return Category[]' , async () => {

            const categories:Category[] = [ category,category,category ]

            when(mockedRepository.find()).thenResolve(categories)

            const result = await categoryService.findAll();

            expect(result).toBe(categories)
            verify(mockedRepository.find()).once()
        })
    })
})