import {
  checkValidationEmail,
  getWelcomTemplate,
  sendTemplateToEmail,
} from "./email.js";

function createUser(user) {
  // 1 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkValidationEmail(user.email);

  if (isValid) {
    // 2 가입 환영 템플릿 만들기
    const mytemplate = getWelcomTemplate(user);

    // 3 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(user.email, mytemplate);
  }
}

const myuser = {
  name: "철수",
  age: 8,
  school: "다람쥐",
  email: "a@a.com",
};
createUser(myuser);
