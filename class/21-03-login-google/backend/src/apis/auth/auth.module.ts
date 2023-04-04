import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
// import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { AuthController } from './auth.controller';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';

@Module({
  imports: [
    // register({}) : JWT 토큰 생성시 설정내용(만료 시간 등)
    JwtModule.register({}), //
    // user table 조회를 위해 TypeOrmModule 추가
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthResolver, //
    AuthService,
    UserService,
    JwtGoogleStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [
    AuthController,
    //
  ],
})
export class AutuModule {}