// index.js 설정 파일
// dependecy 주입
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/boards/boards.module';
import { Board } from './apis/boards/entities/board.entity';

@Module({
  // 모듈역할하는 클래스
  imports: [
    BoardModule,
    // forRoot() 메서드는 옵션 객체를 인수로 받을 수 있음
    // 옵션은 ApolloServer 생성자(constructor)에 전달됨
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      // 작성한 파일 경로로 SchemaFile이 자동으로 만들고 실행
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '00000000',
      database: 'myproject',
      entities: [Board],
      syncronize: true, // entity 테이블을 데이터베이스와 동기화할 것인지
      logging: true, // 콘솔 창에 log를 표시할 것인지
    }),
    // MymoduleModule
  ],
  // controllers: [AppController],
  // providers: [AppService], // 1 AppService 주입
})
export class AppModule {}

// syncronize : Entity와 MySQL DB에 있는 실제 저장된 컬럼들이 서로 같게 동기화
// logging : typeorm을 통해 sql query문으로 만들어져서 보이는 것을
// 서버 실행시 터미널에서 확인
