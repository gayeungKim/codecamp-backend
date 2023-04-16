// 2 가입 환영 템플릿 만들기
import { getWelcomTemplate } from "../format/emailFormat.js";

export function welcomEmail(email, name, phoneNumer, mySite, date) {

    console.log(getWelcomTemplate(name, email, phoneNumer, mySite, date));
}
