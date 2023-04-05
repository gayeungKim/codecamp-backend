const fetchData = async () => {
    console.log("여기는 1번!!");
    // new Promise() 메서드를 호출할 때 콜백 함수를 선언할 수 있고,
    // 콜백 함수의 인자는 resolve, reject 임
    await new Promise((resolve, reject) => {
      // XMLHttpRequest(요청)
      // 뭔가 특정 작업(API보내기 등)
      // 함수실행 시간 설정
      setTimeout(() => {
        try {
          resolve("성공시 받는 데이터");
        } catch (error) {
          reject("실패했습니다!!");
        }
      }, 2000);
    }).then((res) => console.log("여기는 2번"));
    console.log("여기는 3번");
  };
  
  fetchData();

  // async-await를 promise에 적용하기 전에는 js에서 실행을 기다려주지 않아
  // 1 3 2 와 같이 실행이 완료되고 출력됨
  // 적용을 하면 의도대로 1 2 3 와 같이 실행이 완료되고 출력됨