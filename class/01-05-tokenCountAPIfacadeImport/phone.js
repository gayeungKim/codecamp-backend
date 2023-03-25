export function getToken(count) {
  if (count === undefined) {
    console.log("undefined error");
    return;
  } else if (count <= 0 || count > 10) {
    console.log("error");
    return;
  }
  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(
    count,
    "0"
  );
  return result;
  //console.log(result);
}
export function checkPhone(pn) {
  if (pn.length !== 10 && pn.length !== 11) {
    console.log("자릿수가 잘못됨");
    return false;
  } else {
    console.log("올바른 전화번호");
    return true;
  }
}

export function sendTokenToSMS(pn, tn) {
  console.log(pn + "번호로 인증번호 " + tn + " 전송");
}
