// .resolver.ts + .service.ts 조립하는 역할

import { Module } from '@nestjs/common';
import { BoardResolver } from './boards.resolver';
import { BoardService } from './boards.service';

@Module({
  //   imports: [],
  //   controllers: [],
  // .resolver.ts와 .service.ts.에서 만든
  // BoardResolver와 BoardService를 providers에 작성
  // => module.ts 파일에서 조립됨
  providers: [BoardResolver, BoardService],
})
export class BoardModule {} // 이것들이 최종적으로 app.module에서 결합됨
