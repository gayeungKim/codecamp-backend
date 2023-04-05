import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}
  @Mutation(() => Payment)
  // createPayment API
  async createPayment(
    @Args('amount') amount: number, //
  ) {
    return await this.paymentService.create({ amount });
  }

  @Query(() => [Payment])
  // fetchPayments API
  async fetchPayments() {
    return await this.paymentService.findAll();
  }
}