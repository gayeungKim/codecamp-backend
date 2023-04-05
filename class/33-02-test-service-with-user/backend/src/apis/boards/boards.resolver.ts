// 실질적 API 로직
// .controller.ts. 와 이름만 다른 파일
// 클라이언트가 DB와 상호 작용 하기 위해 Resolver 클래스 생성
// 어떤 Resolver가 어떤 Request를 수신하는지 제어
// (Routing 개념)
// 각 Resolver는 최소 1개의 Route를 가짐
// 각 Route는 다른 action으로 동작

import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
export class BoardResolver {
  // constructor에 boardService 주입       : type 지정
  constructor(
    private readonly boardService: BoardService,

    // 생성자 안에 CACHE_MANAGER 주입
    // cachemanager에 대한 설정 redis로 되어있음
    // => redis에서 조회와 생성이 가능
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  //[Board] 여러개의 객체를 담기 위해 배열로 지정
  @Query(() => [Board]) // 조회시 Query()
  fetchBoard(){
    return this.boardService.findAll();
  }

  @Mutation(() => String) // 등록,수정,삭제 Mutation()
  async createBoard(
    // (gql 타입) : 타입스크립트 타입
    // Args를 개별로 받음 -> 단점: 데이터가 커질수록 비효율 (객체로 변경)
    @Args('writer') writer: string, 
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
    
  ){
    // 1 캐시 등록
    // set: redis에 저장
    await this.cacheManager.set('aaa', createBoardInput, {
      // ttl: 저장기간
      ttl: 0,
      // 캐시 영구적으로
    });

    // 2 캐시 조회
    // get: value 반환
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);
    return '캐시 테스트';
    // return this.boardService.create({ writer, title, contents });
    // 기존 한꺼번에 받던 return
    // return this.boardService.create({
    //   writer,
    //   title,
    //   contents,
    //   createBoardInput,
    // });
    // 객체로 받았기 때문에 개별로 받을 수 있음
  }

  // @Query 안에 getHello 함수에 대한 return type 정의
  // GraphQL에서 API-Docs를 만들기 위한 type으로 대문자 시작
  // 기존: resolver 생성 후 type을 따로 지정
  // 아래: 쿼리 안에 작성 -> 자동생성
  // @Query(() => String)
  // // getHello() 함수 생성
  // // TypeScript type 지정으로 타입지정은 불필요, 소문자 시작
  // getHello() {
  //   // BoardService의 aaa 비지니스 로직 실행
  //   return this.boardService.aaa();
  // }
}
