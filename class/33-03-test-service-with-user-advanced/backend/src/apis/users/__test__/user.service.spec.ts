// 실습한 Userservice는 UserRepository를 주입받아 사용. 만약 Testing시
// 실제 Repository를 사용한다면 DB에 데이터가 들어가게 되어 심각하 오류 발생
// => UserRepository를 Mocking하여 독립된 환경에서 Service를 테스트!

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

// class로 MokeUserRepository 선언
class MockUserRepository {
  mydb = [{ email: 'a@a.com', password: '0000', name: '짱구', age: 8 }];

  // email을 기준으로 회원 find
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

// typeorm에서 제공하는 repository
// generic type
// Repository<User> 를 사용하겠다

// keyof: "create" | "update" | "findOne"
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    // <>: generic type!!!
    userService = userModule.get<UserService>(UserService);

    userRepository = userModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    });


  describe('create', () => {
    // jest: repository가 몇번 호출되는지 확인하는 것
    // findone을 추적함
    const userRepositorySpyFindeOne = jest.spyOn(userRepository, 'findOne');
    // save를 추적함
    const userRepositorySpySave = jest.spyOn(userRepository, 'save');
    it('이미 존재하는 이메일 검증하기!!', async () => {
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

      // findeOne은 1번 실행될 것으로 예상
      expect(userRepositorySpyFindeOne).toBeCalledTimes(1);
      // 현 실습에서는 conflicException으로 이미 존재하는 이메일이라
      // save는 0번 실행될 것으로 예상
      expect(userRepositorySpySave).toBeCalledTimes(0);
    });

    it('회원 등록 잘됐는지 검증!!', async () => {
      const userRepositorySpyFindeOne = jest.spyOn(userRepository, 'findOne');
      const userRepositorySpySave = jest.spyOn(userRepository, 'save');

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

      expect(userRepositorySpyFindeOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {});
});