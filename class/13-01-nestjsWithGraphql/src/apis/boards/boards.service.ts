// 핵심 비지니스 로직

import { Injectable } from '@nestjs/common';

@Injectable() // 의존성주입 관련 데코레이터
export class BoardService {
  aaa() {
    return 'Hello World!';
  }
}
