function getToken(a) {
  // undefined
  // null 강제로 변수 초기화 사용
  if (a === undefined) {
    // 수를 입력하지 않았다면
    console.log("undefined error");
    return; // 함수종료
  } else if (a <= 0) {
    // 음값
    console.log("error");
    return; // 함수종료
  } else if (a > 10) {
    // 너무 큼
    console.log("error");
    return; // 함수종료
  }

  const result = String(Math.floor(Math.random() * 10 ** a)).padStart(a, "0");
  console.log(result);
}

getToken(3);
