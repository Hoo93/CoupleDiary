import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"
import { BaseTimeEntity } from "../entity/BaseTimeEntity";
import { userInfo } from "os";
import { Board } from "../Board/Board";

@Entity()
@Unique(['name'])
@Unique(['nickname'])
export class User extends BaseTimeEntity {

    @Column()
    name:string;

    @Column()
    password:string;

    @Column({default:true})
    isActivated:Boolean;

    @Column()
    nickname:string;

    @OneToMany(() => Board, (boards) => boards.user)
    boards:Board[];

    // constructor() {
    //     super();
    // }

    // 정적 (static) 메소드는 클래스의 인스턴스가 아닌 클래스 이름으로 호출한다.
    static signup(
        name:string,
        nickname:string,
        password:string,
        createdAt:Date,
        updatedAt:Date): User {
            const user = new User();
            user.name = name;
            user.nickname = nickname;
            user.password = password;
            user.createdAt = createdAt;
            user.updatedAt = updatedAt;
            user.isActivated = true
            return user
    }

    activate(): void {
        this.isActivated = true;
    }

    deactivate(): void {
        this.isActivated = false;
    }

}
