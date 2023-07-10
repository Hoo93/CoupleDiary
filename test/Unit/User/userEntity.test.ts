import { User } from "../../../src/User/User";

describe('User Entity test', () => {
    let now;
    let name;
    let nickname;
    let password;
    let user;

    beforeEach( () => {
        now = new Date();
        name = "test name"
        nickname = "test name"
        password = "test password"
        user = User.signup(name,nickname,password,now,now)
    })

    it('User.signup should return user', () => {
        expect(user.createdAt).toBe(now)
        expect(user.updatedAt).toBe(now)
        expect(user.name).toBe(name)
        expect(user.nickname).toBe(nickname)
        expect(user.password).toBe(password)
        expect(user.isActivated).toBe(true)
    })

    it('should return isActivated false', () => {
        user.deactivate()
        expect(user.isActivated).toBe(false)

        user.activate()
        expect(user.isActivated).toBe(true)

    })
})