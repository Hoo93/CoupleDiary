import { Category } from "../../../src/Category/Category";

describe('Category Entity test', () => {

    let now;
    let name;
    let category;

    beforeEach( () => {
        now = new Date();
        name = 'test name'

        category = Category.createCategory(name,now)
    })

    it('Category.createCategory should return category', () => {
        expect(category.name).toBe(name)
        expect(category.createdAt).toBe(now)
        expect(category.updatedAt).toBe(now)
    })

})