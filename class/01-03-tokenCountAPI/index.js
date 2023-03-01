function createTokenOfPhone(pn) {
  // 1 자릿수 확인
  if (pn.length !== 10 && pn.length !== 11) {
    console.log("자릿수가 잘못됨");
    return;
  } else {
    console.log("올바른 전화번호");
  }

  // 2 토큰 6자리
  const a = 6;
  if (a === undefined) {
    console.log("undefined error");
    return;
  } else if (a <= 0 || a > 10) {
    console.log("error");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** a)).padStart(a, "0");
  console.log(result);

  // 3 토큰 전송
  console.log(pn + "번호로 인증번호 " + result + " 전송");
}

createTokenOfPhone("01012345678");
