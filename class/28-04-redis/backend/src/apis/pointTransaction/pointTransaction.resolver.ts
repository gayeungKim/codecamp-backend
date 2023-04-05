import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { PointTransaction } from './entities/pointTransaction.entity';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { PointTransactionService } from './pointTransaction.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
  ) {}

  // UseGuards: 로그인한 사용자만 api 요청 가능
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    // 프론트에서 impUid와 충전금액 amount, 가드를 이용해 어떤 User인지 받아옴
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 받아온 data를 pointService의 create로 넘김
    return this.pointTransactionService.create({
      impUid,
      amount,
      currentUser,
    });
  }
}