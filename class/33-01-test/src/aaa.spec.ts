// 1 개별 테스트
// it : 하나의 테스트 단위
// it('add test', () =>{
//   const a = 1;
//   const b = 2;

//   expect(a + b).toBe(3);
// })

// 2 그룹 테스트
// describe : 여러개의 테스트 코드를 작성할 수 있도록
// describe('test group', () => {
//   it('add test', () =>{
//     const a = 1;
//     const b = 2;
  
//     expect(a + b).toBe(3);
//   })

//   it('multiple test', () =>{
//     const a = 3;
//     const b = 2;
  
//     expect(a * b).toBe(6);
//   })
// })

// 3  시나리오 테스트
// 상품을 구매하는 테스트 로직(단, 로그인 사용자만 접근)
describe('scenario', () => {
  // 상품 구매 전 사전 조건: 로그인 사용자만 접근
  beforeEach(() => {
    // 로그인 로직 작성!
  })

  // 돈이 있는지 확인하고
  it('isVaildMoney test', () =>{
    const result = true;
  
    expect(result).toBe(true);
  })

  // 돈이 있다면 구매한다
  it('buyProduct', () =>{
    const result = true;
  
    expect(result).toBe(true);
  })
})