import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FileService {
  // 구글 스토리지에 파일을 업로드하고 그에 대한 파일 URL을
  // 리턴할 비지니스 로직리턴할 것
  // promise가 끝날 때 까지 기다리기 위해 await를 사용.
  async upload({ files }) {
    // console.log(files);
    // 파일이 배열로 들어오기 때문에 Promise.all() 사용
    // Promise.all(): 파라미터로 프로미스가 담긴 배열을 받음
    // const waitedFiles = await Promise.all(files);
    // console.log(waitedFiles)

    // --------
    // 구글 스토리지에 파일 업로드
    // Google-storage를 사용하기 위해 필요한 내용 추가
    const myfile = files[0];

    // new Storage를 생성해 storage를 사용하기 위해 필요한 값들을 넣어줌
    const storage = new Storage({
      // GCP에서 사용할 프로젝트 ID
      projectId: '프로젝트아이디',
      // Cloud Storage를 사용하기 위한 인증이 필요한 key 파일명
      keyFilename: '키파일이름',
    })
      // GCP-Cloud Storage에서 업로드된 파일이 저장될 버킷명
      .bucket('폴더명')
      // 버킷에 저장될 파일명
      .file(myfile.filename);

    // 파일 업로드 부분에 Promise를 적용하고 그 Promise에 async-await를
    // 적용했기 대문에 resolve 혹은 reject가 완료 될 때까지
    // 대기상태를 유지할 것임
    await new Promise((resolve, reject) => {
      // myfile을 google-storage에 업로드
      myfile
        // 해당 파일을 읽음
        .createReadStream()
        // pipe를 기준으로스토리지에 파일을 올림
        // () 안에는 파일이 올라갈 위치가 담긴 storage와
        // storage에 올려주는 역할을 하는 createWriteStream을 넣어줌
        .pipe(storage.createWriteStream())
        // on을 기준으로 finish인 경우 => resolve를 사용해 경로를 반환
        .on('finish', () => resolve('짱구'))
        // on을 기준으로 error인 경우 => reject를 사용해서 error를 반환
        .on('error', () => reject());
    });

    return ['~~~url'];
  }
}

// 1 브라우저에서 어떻게 파일을 받아올 것인가
// 2 구글 스토리지에 어떻게 저장할 것인가

// pending: 둘 이상의 요청을 받아올 때 딜레이가 걸리는 것 
// 스토리지에 이미지 파일을 업로드하는 것은 시간이 오래 걸림
// async-awaite는 Promise에만 적용 가능한데 스토리지에 이미지를
// 업로드하는 과정은 Promise가 아님

// Promise : js 비동기 처리에 사용되는 객체
//  - 비동기 처리: 특정 코드의 실행이 완료될 때까지 기다리지 않고
//      다음 코드를 먼저 수행하는 js 특성)
//  - 프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용
//  - 데이터를 요청하는 api가 실행될 경우 서버는 데이터가 불러오기를
//      기다리지 않고 빈 log를 보내는 경우가 있음 => 프로미스로 해결

// state of Promise
// - Pending: 대기, 비동기 처리 로직이 아직 완료되지 않은 상태
    // new Promise(); // 메서드 호출
    // new Promise(function(resolve, reject)) {/...}
// - Fullfilled: 이행, 비동기 처리가 완료되어 프로미스가 결괏값을 반환한 상태
    // new Promise(function(resolve, reject) {
    //   resolve();
    // }) // 이행상태

    // function getData() {
    //   return new Promise(function(resolve, reject) {
    //     let data = 100;
    //     resolve(data);
    //   }); // 이행상태
    // }

    // // resolve()의 결과 값 data를 resolvedData로 받음
    // getData().then(function(resolvedData) {
    //   console.log(resolvedData);
    // })
    // 이행상태 완료시 then()을 사용하여 처리 결과값을 받을 수 있음
// - Rejected: 실패, 비동기 처리가 실패하거나 오류가 발생한 상태
    // function getData() {
    //   return new Promise(function(resolve, reject) {
    //     reject(new Error("Request is failed"));
    //   });
    // }

    // // reject()의 결과 값 Error를 err에 받음
    // getData().then().catch(function(err) {
    //   console.log(err);
    // 	// Error: Request is failed
    // });