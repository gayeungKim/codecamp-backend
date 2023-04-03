import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // connection 객체는 typeOrm Module을 import 한 것만으로도 의존성을 가져올 수 있음
    // 이 의존성을 토대로 createQueryRunner() 함수를 통해 Transaction Manager를 수행
    private readonly connection: Connection,
  ) {}

  // 거래 기록 관련 로직
  async create({ impUid, amount, currentUser }) {
    // createQueryRunner() 함수로 queryRunner 선언
    const queryRunner = await this.connection.createQueryRunner();
    // connect() 함수로 DB 연결
    await queryRunner.connect();

    // ..transacion 시작
    // startTransacion() 함수로 transaction 시작 선언
    await queryRunner.startTransaction();
    // ..

    try {
      // 1 pointTransacion 테이블에 거래 기록 1줄 생성
      const pointTransaction = this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      // await this.pointTransactionRepository.save(pointTransaction);
      // .manager.save : transaction을 처리하는 save method
      // !! repository : transaction과 관계 없기 때문에 DB 오염 발생 !!
      await queryRunner.manager.save(pointTransaction);

      // 임의로 error 발생 (transaction 확인)
      // catch로 잡아내 rollbackTransaction() 함수를 통해 rollback 수행
      // error가 발생하지 않았다면 transaction이 완료되어 commitTransaction() 함수를
      // 호출하여 확정 지어주고, finally에서 release() 함수를 호출해 Transaction을 종료
      // throw new Error('error 발생(transacion)');

      // // 에러 발생
      // throw new Error('에러에러에러에러에러에러');
      // // 데이터 오염 발생
      // // 포인트 충전시 결제는 됐지만 결제후 오류 발생으로 포인트 지급이 안됨
      // // ACID 트랜잭션 사용이 이를 막을 수 있음

      // 2 유저의 돈 찾아오기
      const user = await this.userRepository.findOne({
        where: { id: currentUser.id },
      });

      // 3 유저의 돈 업데이트
      // // .update(조건, 변경할 값)
      // await this.userRepository.update(
      //   { id: user.id },
      //   // 기존 point + 적립 point
      //   { point: user.point + amount },
      // );
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);

      // commit 성공 확정
      await queryRunner.commitTransaction();

      // 4 최종결과 프론트로 전달
      return pointTransaction;
      // 
    } catch (error) {
      // rollback
      await queryRunner.rollbackTransaction(); 
    } finally {
      // 연결 해제
      // connect가 일정(1510)이 넘어가면 더 이상 연결되지 않음
      // (연결할 수 없다는 error가 뜰 것)
      // release를 통해 transaction을 종료해주어야 함
      // await queryRunner.release();
    }

  }
}

// .create() : DB로 저장되는 것이 아니라, 해당 데이터를 가진 객체가 생성됨
// .save() : 객체를 DB에 저장
// .update() : 수정 결과를 return, DB에 수정 결과 저장
