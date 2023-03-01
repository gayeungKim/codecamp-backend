import { getToday } from "./utils.js";
import nodemailer from "nodemailer";
import "dotenv/config";

export function checkValidationEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("잘못된 이메일 형식");
    return false;
  } else {
    return true;
  }
}

export function getWelcomTemplate({ name, age, school }) {
  return `
    <html>
      <body style="width: 500px;">
      <h1 style="color: red">${name}님 가입을 환영</h1>
      <hr />
      <div>이름: ${name}</div>
      <div>나이: ${age}세</div>
      <div>학교: ${school}초등학교</div>
      <div>가입일: ${getToday()}</div>
      </body>
    </html>
    `;
}
export async function sendTemplateToEmail(email, mytemplate) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "가입을 축하합니다",
    html: mytemplate,
  });
  console.log(result);
}
