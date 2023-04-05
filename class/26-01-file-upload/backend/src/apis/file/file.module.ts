import { Module } from '@nestjs/common';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

// 생성한 모듈은 app.module에서 모두 명시해주어야 함!
@Module({
  providers: [
    FileResolver, //
    FileService,
  ],
})
export class FileModule {}