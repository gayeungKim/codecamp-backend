import { getToday } from "./utils.js";
export function checkValidationEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("잘못된 이메일 형식");
    return false;
  } else {
    return true;
  }
}

export function getWelcomTemplate({ name, age, school }) {
  const result = `
    <html>
      <body>
        <h1>${name}님 가입을 환영</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>나이: ${age}세</div>
        <div>학교: ${school}초등학교</div>
        <div>가입일: ${getToday()}</div>
      </body>
    </html>
    `;
  return result;
}
export function sendTemplateToEmail(email, mytemplate) {
  //  console.log(email + "에 " + mytemplate + "을 전송합니다");
  console.log(`${email}에 ${mytemplate}을 전송합니다`);
}
