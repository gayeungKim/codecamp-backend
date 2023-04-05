// // it: 하나의 테스트 단위

// // // 1 한개 테스트
// // it('더하기 test', () => {
// //   const a = 1;
// //   const b = 2;

// //   expect(a + b).toBe(5); // 수정
// // });

// // // 2 여러개 묶음 테스트
// // describe('my test group', () => {
// //   it('더하기 test', () => {
// //     const a = 1;
// //     const b = 2;

// //     expect(a + b).toBe(3);
// //   });

// //   it('곱하기 test', () => {
// //     const a = 7;
// //     const b = 2;

// //     expect(a * b).toBe(14);
// //   });
// // })

// // 3 상품 구매하기 테스트 예제
// describe('상품 구매 테스트', () => {
//   // 각각을 테스트하기 전에 먼저 실행될 로직
//   beforeEach(() => {
//     // 로그인 로직!
//   });

//   it('돈 있는지 확인', () => {
//     const result = true; // 돈이 있다고 가정
//     // 돈이 있다면 true를 반환할 것. 이값이 true와 일치해야 함
//     expect(result).toBe(true);
//   });

//   it('상품 구매', () => {
//     const result = true;
//     // 상품 구매를 완료했다면 true를 반환할 것.
//     // 이값이 true와 일치해야 함
//     expect(result).toBe(true);
//   });
// })