import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// createParamDecorator : CurrentUser 라는 데코러이터 이름으로 작성
export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    // GqlExecutionContext.create(context)를 통해 qraphql context 생성
    const ctx = GqlExecutionContext.create(context);
    // getContext() : GraphQL context에서 req.user를 가져옴
    return ctx.getContext().req.user;
  },
);