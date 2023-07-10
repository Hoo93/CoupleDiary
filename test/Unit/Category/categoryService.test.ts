import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { CategoryRepository } from "../../../src/Category/CategoryRepository";
import { CategoryService } from "../../../src/Category/CategoryService"
import { CategoryDto } from "../../../src/Category/dto/CategoryDto";
import { Category } from "../../../src/Category/Category";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { UpdateResult } from "typeorm";

describe('categoryService unit test', () => {

    let categoryService:CategoryService;
    let mockedRepository:CategoryRepository;
    
    let categoryDto:CategoryDto;
    categoryDto = new CategoryDto();
    categoryDto.name = "test category name"

    const now = new Date();

    let category:Category = new Category();
    category.id = 1;
    category.name = "test category name";
    category.createdAt = now;
    category.updatedAt = now;

    beforeEach( () => {
        mockedRepository = mock(CategoryRepository);
        categoryService = new CategoryService(instance(mockedRepository))
        
    })

    describe('categoryDto test', () => {
        

        it('categortDto.toEntity should call createCategory.', () => {
            const spyCategoryDtoToEntity = jest.spyOn(Category,'createCategory')

            categoryDto.toEntity(now)

            expect(spyCategoryDtoToEntity).toBeCalledTimes(1);
            expect(spyCategoryDtoToEntity).toBeCalledWith(categoryDto.name,now);
        })
    })

    describe('createCategory test', () => {

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

    describe('updateCategory method test', () => {

        it('should be a function', async () => {
            expect(typeof categoryService.updateCategory).toBe('function')
        })

        it('should return category id', async () => {
            const updateResult:UpdateResult = new UpdateResult();
            updateResult.affected = 1

            when(mockedRepository.findOneBy(deepEqual({id:1}))).thenResolve(new Category())
            when(mockedRepository.findOneBy(deepEqual({name:categoryDto.name}))).thenReturn(null)
            when(mockedRepository.update(1,deepEqual(categoryDto))).thenResolve(updateResult)

            const result = await categoryService.updateCategory(1,categoryDto);

            verify(mockedRepository.findOneBy(deepEqual({name:categoryDto.name}))).once()
            expect(result).toBe(1)
        })

        it('should throw NotFoundError when category with id doesnt exist', async() => {
            
            when(mockedRepository.findOneBy(deepEqual({id:1}))).thenReturn(null)
            
            await expect( async () => {
                await categoryService.updateCategory(1,categoryDto) 
            }).rejects.toThrowError(new NotFoundError(`category with id:1 doesn't exist`))
            verify(mockedRepository.findOneBy(deepEqual({id:1}))).once()
        })

        it('should throw BadRequestError when same name in DB', async() => {
            const findName = new Category();
            findName.name = categoryDto.name
            
            when(mockedRepository.findOneBy(deepEqual({id:1}))).thenResolve(category)
            when(mockedRepository.findOneBy(deepEqual({name:categoryDto.name}))).thenResolve(findName)

            await expect(async () => {
                await categoryService.updateCategory(1,categoryDto)
            }).rejects.toThrowError(new BadRequestError(`category name with ${categoryDto.name} already exist`))
            verify(mockedRepository.findOneBy(deepEqual({id:1}))).once()
            verify(mockedRepository.findOneBy(deepEqual({name:categoryDto.name}))).once()
        })


    })
})