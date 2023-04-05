import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

// rest API에서 라우터 핸들링시 controller 사용
@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // API endpoint : '/login/google'
  // 구글 개발자 모드에서 설정한 redirection을 위한 endpoint
  // redirection URL과 동일하게 지정
  @Get('/login/google')
  // Guard를 통해 로그인 보안
  // AuthGuard : passport에서 제공하는 guard
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    // rest API로 인해 바로 @를 사용하여 req와 res를 받아올 수 있음
    // req에는 유저정보가 추가됨(& 연산자로 인터페이스를 통해 발생된
    // 다른 타입 추가 가능)
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1 가입확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 2 회원가입
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        hashedPassword: req.user.password,
        name: req.user.name,
        age: req.user.age,
      });
    }

    // 3 로그인
    // accessToken보다 생명주기가 긴 refreshToekn 전달
    // 구글 로그인을 통해 구글 인증을 받은 후, refreshToken 인가
    // : 소셜 로그인을 통한 로그인도 일반 로그인 사용자와 동일하게
    // 내부 api에 접근할 수 있게하기 위함
    this.authService.setRefreshToken({ user, res });
    // 로그인 성공시 구글 로그인 페이지를 redirect를 통해
    // 내부 로그인 페이지로 전환
    // 로그인 후 사용자가 보게되는 첫 페이지로 redirect
    res.redirect(
      // 쿠키에 refeshToken이 들어간 상태로 페이지가 redirect 될 것
      // accesstoken을 payload로 보내지 않는 이유: 페이지 리다이렉트시
      // 새로운 페이지가 열리기 때문에 refreshToken을 통해 새로운
      // accessToken을 재발급 받을 수 있음
      'http://localhost:5500/class/21-03-login-google/frontend/social-login.html',
    );
  }
}
