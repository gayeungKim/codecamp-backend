import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
  // ? : 컬럼값이 필수가 아닐 때
  id?: string;
  email: string;
  name?: string;
  password?: string;
  age?: number;
}
export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);