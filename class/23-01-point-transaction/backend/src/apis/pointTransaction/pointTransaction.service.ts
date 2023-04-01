import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 거래 기록 관련 로직
  async create({ impUid, amount, currentUser }) {
    // 1 pointTransacion 테이블에 거래 기록 1줄 생성
    const pointTransaction = this.pointTransactionRepository.create({
      impUid: impUid,
      amount: amount,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    await this.pointTransactionRepository.save(pointTransaction);

    // 2 유저의 돈 찾아오기
    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    // 3 유저의 돈 업데이트
    // .update(조건, 변경할 값)
    await this.userRepository.update(
      { id: user.id },
      // 기존 point + 적립 point
      { point: user.point + amount },
    );

    // 4 최종결과 프론트로 전달
    return pointTransaction;
  }
}

// .create() : DB로 저장되는 것이 아니라, 해당 데이터를 가진 객체가 생성됨
// .save() : 객체를 DB에 저장
// .update() : 수정 결과를 return, DB에 수정 결과 저장
