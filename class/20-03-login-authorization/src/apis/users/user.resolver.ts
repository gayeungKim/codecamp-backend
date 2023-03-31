// import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from '../auth/gql-user.param';

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
    const hashedPassword = await bcrypt.hash(password, 10.2);
    console.log(hashedPassword);
    // 등록된 user data return
    return this.userService.create({ email, hashedPassword, name, age });
  }

  // UseGuard: 방어막, Guard를 통해 인가 확인
  // @UseGuards(AuthGuard('myGuard')) // rest API 방식
  // 인증해줄 guard 데코레이터
  @UseGuards(GqlAuthAccessGuard) // graphql API 방식
  // @Query(() => String)
  // fetchUser(){
  //   console.log('fetchUser 실행 완료!!!');
  //   return 'fetchUser 실행 완료!!!';
  // } // graphql 방식 인가
  @Query(() => String)
  fetchUser(
    @CurrentUser() currentUser: any, //
  ){
    console.log('fetchUser 실행 완료!!!');
    console.log('유저정보: ', currentUser);
    return 'fetchUser 실행 완료!!!';
  } // graphql 방식 인가 + 현재 로그인한 사용자 data 받아오기
}