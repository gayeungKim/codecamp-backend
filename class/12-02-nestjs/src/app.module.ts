// index.js 설정 파일
// dependecy 주입
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // 모듈역할하는 클래스
  imports: [],
  controllers: [AppController],
  providers: [AppService], // 1 AppService 주입
})
export class AppModule {}
