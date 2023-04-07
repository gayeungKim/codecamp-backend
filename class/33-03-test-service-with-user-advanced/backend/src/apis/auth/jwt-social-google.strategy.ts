import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

// 소셜 로그인은 제공하는 곳에서 인가를 진행해 복호화키를 알 수 x
// 구글 개발자 모드(GCP)에서 받게되는 클라이언트 ID와 보안 비밀번호를
// 인가 부분에 작성하면 구글을 통한 인가가 이루어짐
// 이때, 클라이언트ID와 보안 비밀번호는 .env에서
// 환경 변수로 관리되어야 함(보안)

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google'){
  constructor() {
    super({
      // clientID: 클라이언트 ID
      clientID:
        '733838029193-09eg89uhq4kk92l5pagud9b3bhi6uv58.apps.googleusercontent.com',
      // clientSecret: 클라이언트 보안키(비밀번호)
      clientSecret: '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',
      // callbackURL: 인증에 성공하면 요청할 API로 추가한 redirection URL
      callbackURL: 'http://localhost:3000/login/google',
      // scope: 구글로부터 데이터를 받아올 유저 정보
      scope: ['email', 'profile'],
    });
  }

  // 인가 성공시 validate 실행
  // (구글에서 넘겨주는 access, refresh, profile을 받아옴)
  validate(accessToken, refreshToekn, profile){
    console.log(accessToken);
    console.log(refreshToekn);
    console.log(postMessage);
    // 받아온 data를 req.userr로 넘김
    return{
      email: profile.emails[0].value,
      password: '12093812093',
      name: profile.displayName,
      age: 0,
    }
  }
}