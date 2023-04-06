import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh'){
  constructor() {
    // super 사용 : 부모 클래스의 생성자 함수를 호출하여 jwt 옵션을 넘겨주기 위함
    super({
      // jwtFromRequest를 통해 프론트로 받은 요청 내에 존재하는,
      // Header에 존재하는 jwt token인 fromAuthHeaderAsBearerToken을
      // 추출해 ExtractJwt를 이용해 줌
      // 이때 추출된 token 값은 Bearer 뒤에 존재하는 문자열
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refeshToken = cookie.replace('refreshToken=', '');
        return refeshToken;
      },
      // secretOrKey : (auth.service.ts에서) 발행했던 secretKey와
      // 동일하게 작성해야 복호화시 token의 payload 정보를 뽑아올 수 있음
      // 따라서 secret과 동일하게 작성해야 함
      secretOrKey: 'myAccessKey',
    });
  }

  // 인가에 실패한다면 아래 validate가 실행되지 않을 것
  // 인가에 성공한다면 (paload를 열어 
  validate(payload) {
    console.log(payload);
    // 사용자 정보를 반환)
    // 요청된 api로 return하는 것이 아님
    // context 안의 req에 user라는 이름으로 email과 id 정보가 담긴 객체를 return
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}

// user.resolver 에서 AuthGuard가 걸린 fetchUser API 실행 ->
// jwt-access.strategy의 검증 로직에 따라 resolver의 AuthGuard 검증 실행
// == 여기까지는 rest Api
// +) graphql에서 guard를 사용하기 위해서는 graphql로 guard 관련
// 데이터를 보내주어야 함


// Authorization -- rest API
// 1 프론트에서 fetchUser API 요청
// 2 Query(fetchUser) 실행 전 'myGuard' 검증 실행
// 3 strategy에서 'myGuard'의 이름을 가진 검증 로직 확인
// 4 검증 로직을 찾아 super를 통해 jwt 옵션이
// PassportStrategy로 넘겨져 jwt 토큰 방식으로 검증 시작
// 5 검증이 완료되면 토큰을 복호화 됐을 때 발생하는
// id 와 email을 payload 형태로 받을 수 있음.
// 검증이 완료되지 않으면 에러 반환
// 따라서, 검증이 완료되어야 api가 실행됨!

// Authorization -- graphql API
// 2 GqlAuthAccessGuard를 통해 GraphQLGuard 검증 진행
// 3 검증 완료시 AuthGuard('myGuard') 검증 진행
// 4 jwt-access.strategy.ts에서 'myGuard'의 이름을 가진 검증 로직 확인
// 5 super를 통해 JWT 옵션을 PassportStrTegy로 넘겨져 wt 토큰 방식으로 검증 시작
// 6 검증 완료시 토큰 복호화 후 발생하는 id와 email을 payload 형태로 받음
// 7 검증 통과 후 UseGuard가 통과되어 API 실행됨

// Authorization이 구현되었을 경우 로그인시 로그인 token을 함께
// 전달하지 않으면 api가 실행되지 않는다. 이때 로그인 token은
// http headers에 담아 전달한다.
// -- HTTP HEADERS --
// {
//    "Authorization" : "Bearer [ 인가된 login token ]"
// }
