import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly connection: Connection,
  ) {}

  /* non-repeatable-read 실습 */
  // findAll 비지니스 로직은 commit을 진행하지 않고 setInterval을 사용해서
  // 반복적으로 조회할 때 항상 같은 결과를 같아오는지 확인하는 실습
  // (repeatable read의 정합성에 타당한지 확인)
  async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try{
      // 동일한 쿼리문에서는 항상 동일한 결과값이 나와야 함
      // 따라서 해당 트랜잭션이 끝나기 전까지, 커밋 전까지는 다시 조회하더라도
      // 같은 결과값이 나와야함.
      // -- repeatable read --
      // 이때 다른 커밋이 들어오면 repeatable-read가 보장되지 않음
      // -- non repeatable read --
      setInterval(async () => {
        const payment = await queryRunner.manager.find(Payment);
        console.log(payment);
      }, 1000);

      // await queryRunner.commitTransaction();
      // const payment = await queryRunner.manager.find(Payment);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  // // create 비지니스 로직은 transaction을 사용해서 payment에 데이터를 조회하고
  // // commit까지 진행함
  // async create({ amount }) {
  //   const queryRunner = await this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction('READ COMMITTED');
  //   try {
  //     // non repeatable read 발생
  //     // 돈 추가해서 보내기
  //     const payment = await this.paymentRepository.create({ amount });
  //     await queryRunner.manager.save(payment);
  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //   }
  // }

  /* DIRTY READ 실습 */
  /*
  async create({ amount }) {
    // queryRunner 선언
    const queryRunner = await this.connection.createQueryRunner();
    // DB 연결
    await queryRunner.connect();
    // transaction 시작
    // 'READ UNCOMMITTED': READ UNCOMMITTED Isolation 사용
    await queryRunner.startTransaction('READ UNCOMMITTED');
    // await queryRunner.commitTransaction();
    try {
      const payment = await this.paymentRepository.create({ amount });
      await queryRunner.manager.save(payment);

      // dirty read 실습을 위해 create 비지니스 로직에 set time을 걸어
      // rollback을 시킴 => commit이 안됐기 때문에 DB에 저장 x
      // 1분 뒤 transaction 실패
      // rollback
      setTimeout(async () => {
        // ??? 왜 rollback이 되지 않는 것인가 ??? 
        await queryRunner.rollbackTransaction();
      }, 1000);

      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  // 이때 findAll 로직은 commite 되지 않은 금액도 함께 조회 (dirty read)
  async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ UNCOMMITTED');
    // await queryRunner.commitTransaction();
    try {
      // 1분안에 조회하면, 위에서 등록한 금액(커밋되지 않은 금액)
      // 이 조회됨 => DIRTY READ
      const payment = await queryRunner.manager.find(Payment);
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }*/
}

// QueryRunner : interface type. manager라는 프로퍼티를 가짐
//            SQL역할을 하는 클래스