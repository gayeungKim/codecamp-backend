import coolsms from "coolsms-node-sdk";

export function getToken() {
  const count = 6;
  if (count === undefined) {
    console.log("갯수 오류");
    return;
  } else if (count <= 0 || count > 10) {
    console.log("개수 오류");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(
    count,
    "0"
  );
  return result;
  //console.log(result);
}

export function checkValidationPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("자릿수가 잘못됨");
    return false;
  } else {
    console.log("올바른 전화번호");
    return true;
  }
}

export async function sendTokenToSMS(phoneN, tocken) {
  //console.log(myphone + "번호로 인증번호 " + tocken + " 전송");

  const mysms = coolsms.default;
  const messageService = new mysms(
    "NCS5KUGAVWEYL2YU",
    "KXOA2P7UANOEPFRGBGP9UXZEBGEBG0VD"
  );
  const result = await messageService.sendOne({
    to: phoneN,
    from: "01075377648",
    //text: ` [${tocken}]`,
    text: `이성진ENT의 1차 합격을 축하드립니다. 2차 면접은 금일 19시 입니다.[${tocken}]`,
  });

  console.log(result);

  // NCS5KUGAVWEYL2YU; // key
  // KXOA2P7UANOEPFRGBGP9UXZEBGEBG0VD; // secret
}
