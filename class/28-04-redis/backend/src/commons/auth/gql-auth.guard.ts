import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// class에 (user.resolver에서 작성한 Guard인)AuthGuard('myGuard')를 상속받음
export class GqlAuthAccessGuard extends AuthGuard('myGuard'){
  // getRequest: AuthGuard 내에 존재하는 검증 함수
  // graphql에 맞게 함수 수정
  // context: request 요청에 포함된 Headers 등의 내용
  // GqlExecutionContext: context를 graphql에 맞게 다시 작성
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // graphql에 맞게 작성한 context안의 req 정보만 
    // user.resolve의 GqlAuthAccessGuard로 return
    return ctx.getContext().req;
  }
}