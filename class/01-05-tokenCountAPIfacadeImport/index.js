import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";

function createTokenOfPhone(myphone, count) {
  const isValid = checkPhone(myphone);
  if (isValid) {
    const mytoken = getToken(count);

    sendTokenToSMS(myphone, mytoken);
  }
}

createTokenOfPhone("01012345678", 6);
