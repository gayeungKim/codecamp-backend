// JWT를 사용하여 인가를 처리하는 것이 아닌
// 구글에서 제공해 주는 Strategy를 사용하여 인가를 처리할 것
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      // clientID: 클라이언트 ID
      // clientSecret: 클라이언트 보안키(비밀번호)
      // .. 이는 .env 파일에서 환경 변수로 관리!
      clientID:
        '513868197900-q9v6g96hdue6q4ou119jilbmijuba7i2.apps.googleusercontent.com',
      clientSecret: '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',
      // callbackURL: 인증에 성공하면 요청할 URL(API로 추가한 redirection url임)
      callbackURL: 'http://localhost:3000/login/google',
      // scope: 구글로부터 받아올 사용자 data
      scope: ['email', 'profile'],
    });
  }

  // 인가에 성공하면 실행될 로직 ( 소셜 로그인 )
  // 구글에서 넘겨주는 accessToken, refreshToken, profile을 받아옴
  validate(accessToken, refreshToekn, profile) {
    console.log(accessToken);
    console.log(refreshToekn);
    console.log(profile);
    // 사용자 데이터 return (req.user로 넘거갈 것)
    return {
      email: profile.emails[0].value,
      password: '12093812093',
      name: profile.displayName,
      age: 0,
    };
  }
}

// 소셜 로그인 사용 시 이전 실습에서의 로그인 인가를 할 수 없음
// 소셜 로그인을 제공하는 구글에서 인가를 진행하기 때문에
// 복호화키를 알 수 없음
// 따라서, 구글 개발자 모드(GCP)에서 클라이언트 ID와 보안 비밀번호
// 등을 인가 부분에 작성하면 구글을 통한 인가가 이루어짐!

// 소셜 로그인 흐름
// 1 프론트 구글 로그인 버튼 클릭 -> loginGoogle API 실행
// 2 인가를 위해 AuthGuard가 프론트ㅔ서 구글 로그인 페이지로 이동
// 3 -- 로그인 진행 --
//   a 로그인 정보가 구글 서버로 넘어가 인가를 진행
//   b 인가 성공시 구글 서버에서 구글 로그인 페이지로 응답
//   c 받은 응답으로 callback URL의 API(loginGoogle API) 진행
//      i. 인가 처리 완료 -> validate 단계로 넘어감
//     ii. return을 통해 해당 데이터가 req.user로 넘어감
//        => curruntUser로 해당 데이터를 받을 수 있음
//   d 구글 로그인 성공 -> auth.controller.ts 파일의 API 로직 실행