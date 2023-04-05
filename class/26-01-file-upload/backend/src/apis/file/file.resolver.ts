import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
// 버전 문제 오류 해결?? >> 해결
// CSRF post 문제 해결??
// import GraphQLUpload from 'graphql-upload';
// import FileUpload from 'graphql-upload';

@Resolver()
export class FileResolver {
  constructor(
    // service에서 생성한 upload()를 사용하기 위해
    // 의존성 주입
    private readonly fileService: FileService, //
  ) {}
  @Mutation(() => [String])
  uploadFile( 
    // @Args() // 파일을 받기
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
    // return 값으로 FileService의 upload를 통해 URL 주소를 반환
    // 하여 브라우저로 보냄
  ) {
    return this.fileService.upload({ files });
  }

}

// GraphQL에서 실제로 받아온 파일과 받고 난 후 파일의 타입이 다르기
// 때문에 타입을 강제로 변경시키는 작업이 필요
// GraphQL -> GraphQLUpload
// Typescript -> FileUpload