// 핵심 비지니스 로직

import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';

@Injectable() // 의존성주입 관련 데코레이터
export class BoardService {
  // aaa() {
  //   return 'Hello World!';
  // }

  findAll() {
    // 1 데이터 조회 로직 (DB 접속)
    const result = [
      {
        number: 1,
				writer: '철수',
        title: '제목입니다~~',
        contents: '내용입니다!!!',
      },
      {
        number: 2,
				writer: '철수',
        title: '제목입니다~~',
        contents: '내용입니다!!!',
      },
      {
        number: 3,
				writer: '철수',
        title: '제목입니다~~',
        contents: '내용입니다!!!',
      },
    ];

    // 2 조회 결과 응답
    return result;
  }

  create(args){
    // 1 데이터 등록 로직 (DB 접속)
    console.log(args);

    // 2 등록 결과 응답
    return '등록에 성공';
  }
}
 