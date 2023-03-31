// import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    // hash 알고리즘을 사용해 비밀번호 암호화
    // hash 메서드의 두번째 인자 10은 salt가 됨
    // 원본인 password를 10회 salt
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // 등록된 user data return
    return this.userService.create({ email, hashedPassword, name, age });
  }
}
