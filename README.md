# TDD 게시판 프로젝트
---
## Introduce

- 🔔 프로젝트 소개
    - TDD를 적용한 개인 게시판 프로젝트 
    - 게시글, 댓글, 대댓글, 좋아요에 대한 CRUD 백엔드 API ( 알림 기능 구현 중)
    - 코드구현과 단위테스트를 병행하며 구현
    - 계층화 구조와 의존성 주입을 적용한 프로젝트
    - 객체가 일 할 수 있게 Entity와 DTO를 사용해 구현

- 🛠️사용기술
    - Language & Framework : Typescript, Node.js, Express.js, TypeORM, PostgreSQL
    - Test : Jest, ts-mockito

- 🖥️ 개발기간
    - 2023.07.~

---
## Entity Relation Diagram

<img width="800" alt="image" src="https://github.com/Hoo93/TDD-Diary/assets/117077999/ae137a7e-7e75-4c51-8ff6-ad73bc9c8e79">

---
## 프로젝트 설명
- 목차
    - [계층화 구조](#계층화-구조)
    - [의존성 주입](#의존성-주입)
    - [단위 테스팅](#단위-테스트-구현)
    - [말하는 객체](#말하는-객체)
    - [Validation](#validation)

---
## 계층화 구조

<img width="400" alt="image" src="https://github.com/Hoo93/TDD-Diary/assets/117077999/4ddd282f-2008-4f90-bf25-7febb6be9cdf">

- 목적 : 테스트하기 쉬운 코드를 만들기 위해 각 계층을 분리하는 계층화 구조 적용

- 계층 구조
    - Controller : routing-controllers 모듈을 활용해 routing 기능 수행
    - Service : 메인 로직을 담당
    - Repository : DB로의 접근을 담당

- 블로그 포스팅
    - 📄 [계층화 구조](https://programmer-hoo.tistory.com/54)
    - 📄 [Repository Class 구현 방법](https://programmer-hoo.tistory.com/65)

---
## 의존성 주입
- 목적 : 의존성 역전
    - 계층화 구조를 사용하면 이웃한 계층을 의존하게 된다.
    - 이 의존 관계를 역전시기 위해 typedi 모듈을 사용해 Container 모듈을 사용한다. 그러면 이웃한 계층이 아닌 계층이 Container를 의지하게 된다.
    - 계층간 결합도가 낮아지고 그에 따라 테스팅하기 쉬운 코드가 된다.

- 구현
    - typedi 모듈 사용
    - class에 @Service() 데코레이터를 사용해 Container에 등록
    - @Inject()를 사용해 의존성 주입

- 효과
    - 코드가 간결해짐
        - 의존성 주입 전)    
        <pre><code>
        const userService = new UserService(UserRepository);
        </pre></code>
        - 의존성 주입 후)     
        <pre><code>
        const userService = new UserService();
        </pre></code>
        - typedi Container에 등록된 class를 찾아 자동으로 의존성을 주입해줌
    - 각 계층이 아닌 Container를 의지하게 해 결합도가 낮아짐
    - 테스팅하기 쉬운 코드가 됨 : 결합도가 낮아지기 때문

---
## 단위 테스팅
<img width="420" alt="Screenshot 2023-07-12 at 0 21 58" src="https://github.com/Hoo93/TDD-Diary/assets/117077999/77a92ff0-142f-4dc8-9fea-0334161ab425">
<img width="420" alt="Screenshot 2023-07-12 at 0 21 05" src="https://github.com/Hoo93/TDD-Diary/assets/117077999/d5f92885-8f8a-453b-a71e-012257dfe397">
- 사용 모듈 : Jest, ts-mockito
- 총 159개의 테스트 / 83% 의 Code Coverage
- 코드구현과 테스트코드 작성을 함께 병행
- 테스트 코드 구현이 어려운 경우 아키텍쳐의 문제라고 판단해 아키텍쳐를 테스트하기 용이한 코드로 변경하며 구현
    - ex) Repository 객체를 주입하는 것이 아닌 Repository Class를 분리


---
## 말하는 객체
- 객체 내부에 메소드를 주입해 객체가 일 할 수 있게 함
    - Entity 객체에서 static method를 통해 객체를 생성하는 코드 구현
    - DTO 객체에서 Entity 객체로 맵핑하는 메소드 구현
    - 객체의 상태를 변화가 필요한 경우 메소드를 Entity에 구현

---
## Validation
- DTO
    - Data Transfer Object를 활용한 1차 검증
    - class-validator 모듈을 활용해 구현
    - DTO 객체에서 Entity와 맵핑해주는 toEntity() 메소드 구현

- Entity
    - TypeORM을 활용해 데이터 중복 검증
    - @Unique 데코레이터를 활용해 데이터 중복 방지

- Service 레이어의 추가 검증
    - 중복 방지, null 값 방지를 위해 Service 레이어에서 데이터 추가 검증

