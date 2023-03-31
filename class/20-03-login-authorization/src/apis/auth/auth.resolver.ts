import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthResolver{
  constructor(
    // login에 라우팅 핸들링에 사용할
    // AuthService와 UserService 의존성 주입
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}
  @Mutation(() => String)
  // login : 라우팅을 핸들링할 함수
  async login(
    // 데코레이터 사용으로 필요한 데이터 지정
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    // 1 로그인(이메일이 일치하는 유저를 DB에서 찾기)
    // 로그인 계정을 찾기 위해 findOne 호출
    const user = await this.userService.findOne({ email });

    // 2 DB에 입력받은 email이 없다면, return error "존재하지 않은 회원"
    // return error : 422
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다');

    // 3 email은 있지만, 암호가 틀렸다면, return error
    // -- 암호 비교 --
    // 입력 받은 password와 bcrypt로 인해 암호화된 password가
    // 일치하는지 확인
    // bcrypt.compare(로그인시 입력하는 pw, 저장된 암호화된 pw)
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다');

    // 4 일치하는 유저가 있으면 accessTocken(JWT) 전달
    return this.authService.getAccessToken({ user });
  }

}

// // authentication : 인증, 토근 발급
// // authorization : 인가, 토큰 확인