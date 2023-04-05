import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';

// Mock Repository 지정하는 타입
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

class MockUserRepository {
  mydb = [{ email: 'a@a.com', password: '0000', name: '짱구', age: 8 }];

  findOne({ email }) {
    const users = this.mydb.filter((el) => el.email === email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    // testingModule 생성시 UserRepository mocking
    // UserRepository가 사용할 findOne method와 save method를 mocking
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    // useService 받아옴
    userService = userModule.get<UserService>(UserService);
    // userModule 받아옴
    // userRepository 변수를 선언하고 MockRepository<User> 타입을 지정
    userModule.get<MockRepository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      // userRepositorySpyFindOne 이라는 이름의 변수에 spyOn의 결과를 담음
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne');
      // jest.spyOn(userRepository, 'save') : save가 몇번 시도 되었는지 체크
      const userRepositorySpySave = jest.spyOn(userRepository, 'save');

      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };
      try {
        await userService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }

      // userRepositorySpyFindOne와 userRepositorySpySave의 호출 횟수 체크 코드
      // userRepositorySpyFindOne이 1번만 실행된 것이 맞는지 확인
      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      // userRepositorySpySave이 1번만 실행된 것이 맞는지 확인
      expect(userRepositorySpySave).toBeCalledTimes(1);
    });

    it('회원 등록 잘됐는지 검증!!', async () => {
      const myData = {
        email: 'bbb@bbb.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };

      const myResultData = {
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      };

      const result = await userService.create({ ...myData });
      expect(result).toStrictEqual(myResultData);
    });
  });

  describe('findOne', () => {});
});