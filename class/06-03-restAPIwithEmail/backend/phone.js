import coolsms from "coolsms-node-sdk";
import "dotenv/config";

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
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const mysms = coolsms.default;
  const messageService = new mysms(SMS_KEY, SMS_SECRET);
  const result = await messageService.sendOne({
    to: phoneN,
    from: SMS_SENDER,
    text: ` [${tocken}]`,
  });

  console.log(result);

  // NCS5KUGAVWEYL2YU; // key
  // KXOA2P7UANOEPFRGBGP9UXZEBGEBG0VD; // secret
}
