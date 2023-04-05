import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryResult, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly connection: Connection,
  ) {}

  /* PHANTOM READ 실습*/
  /*async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 락을 걸고 조회해서 다른 쿼리에서 조회를 못하게 막음(대기시킴)
      // Select ~ For Update
      // findAll 비지니스 로직에 Transaction을 사용하여 조회하며
      // lock: { mdoe: 'pessimistic_write' }를 사용해 read, write를 모두 막음
      const payment = await queryRunner.manager.find(Payment, {
        lock: { mode: 'pessimistic_write' },
      });
      console.log(payment);

      // 처리에 5초간의 시간이 걸림을 가정
      setTimeout(async () => {
        await queryRunner.commitTransaction();
      }, 5000);
      return payment;

      // await queryRunner.commitTransaction();
      // const payment = await queryRunner.manager.find(Payment);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // 조회를 했을 때, 락이 풀릴때까지 대기
      const payment = await queryRunner.manager.find(Payment);
      console.log('================== 시 도 ==================');
      console.log(payment);
      console.log('===========================================');
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }*/

  /* non-repeatable-read 실습 */
  // findAll 비지니스 로직은 commit을 진행하지 않고 setInterval을 사용해서
  // 반복적으로 조회할 때 항상 같은 결과를 같아오는지 확인하는 실습
  // (repeatable read의 정합성에 타당한지 확인)
  /*async findAll() {
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

  // create 비지니스 로직은 transaction을 사용해서 payment에 데이터를 조회하고
  // commit까지 진행함
  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      // non repeatable read 발생
      // 돈 추가해서 보내기
      const payment = await this.paymentRepository.create({ amount });
      await queryRunner.manager.save(payment);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }*/

/*  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ UNCOMMITTED');
    try {
      const payment = await this.paymentRepository.create({ amount });
      await queryRunner.manager.save(payment);

      // 5초 뒤에 특정 이유로 실패함!!!
      setTimeout(async () => {
        await queryRunner.rollbackTransaction();
      }, 5000);
      //   await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ UNCOMMITTED');
    try {
      // 만약 5초 이내에 조회하면, 위에서 등록한 금액(커밋되지 않은 금액)이 조회됨
      const payment = await queryRunner.manager.find(Payment);
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }*/

  /* DIRTY READ 실습 */
  async create({ amount }) {
    // queryRunner 선언
    const queryRunner = await this.connection.createQueryRunner();
    // DB 연결
    await queryRunner.connect();
    // transaction 시작
    // 'READ UNCOMMITTED': READ UNCOMMITTED Isolation 사용
    await queryRunner.startTransaction('READ UNCOMMITTED');
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
    try {
      // 1분안에 조회하면, 위에서 등록한 금액(커밋되지 않은 금액)
      // 이 조회됨 => DIRTY READ
      const payment = await queryRunner.manager.find(Payment);
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }
}

// QueryRunner : interface type. manager라는 프로퍼티를 가짐
//            SQL역할을 하는 클래스