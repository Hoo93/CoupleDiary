import { User } from "../../../src/User/User";

describe('User Entity test', () => {
    it('should return user', () => {
        const now = new Date();
        const name = "test name"
        const nickname = "test name"
        const password = "test password"
        const user = User.signup(name,nickname,password,now,now)
        console.log(now)
        expect(user.createdAt).toBe(now)
        expect(user.updatedAt).toBe(now)
        expect(user.name).toBe(name)
        expect(user.nickname).toBe(nickname)
        expect(user.password).toBe(password)

    })
})