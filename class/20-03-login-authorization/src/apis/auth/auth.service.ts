import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    // JwtService를 의존성 주입하여 Jwt 관련된 비지니스로직 사용
    // Jwt는 누구나 열람이 가능하기 때문에 많이 데이터를 저장하지
    // 않도록 주의
    private readonly jwtService: JwtService, //
  ) {}

  // jwtService를 이용하면 토큰이 바로생성되기 때문에 await 사용 x
  getAccessToken({ user }) {
    // jwt sign 메서드
    // jwt.sign(json data, secretKey, [options, callback])
    // - 토큰 생성 메소드
    // - json data: 유저 정보가 담기 payload 의미
    // - secretKey: 서명된 JWT를 생성할 때 사용하는 키
    // (암호화와 복호화에서 사용되는 키)
    // - option: 해싱 알고리즘, 토큰 유효기간 및 발행자 지정 가능
    // - options에 algorithm(default: HS256, 문자열 길이), expirensIn,
    // issuer, subject 지정 가능
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      // secret: accessToken 작성하는 부분
      // 원하는 비밀번호를 문자열 형태로 작성
      // expriesIn: 토큰 만료시간 (짧을수록 안정성 증가)
      // 1s 1m 1h 1w
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }
}

