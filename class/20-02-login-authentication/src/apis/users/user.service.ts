import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // login 시 email이 있는지 find
  async findOne({ email }){
    return await this.userRepository.findOne({ where: { email } });
  }

  // resolver에서 받아온 hashedPassword를 create 함수 내에서
  // password로 바꾸어서 사용
  // -> db 저장시 password: password 로 k = v 형태의 숏핸드 속성
  // => 코드 간결해짐
  async create({ email, hashedPassword: password, name, age }) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    return await this.userRepository.save({ email, password, name, age });
  }
}