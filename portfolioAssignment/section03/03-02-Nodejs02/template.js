// 2 가입 환영 템플릿 만들기
import { custom } from "../03-01-Nodejs01/customNumber.js";
import { getWelcomTemplate } from "./format.js";

function welcomEmail(name, email, registerNumber, phoneNumer, mySite) {
    // const customRegisNumber = custom(registerNumber);
    // const template = getWelcomTemplate(name, email, customRegisNumber, phoneNumer, mySite);
    console.log(getWelcomTemplate(name, email, custom(registerNumber), phoneNumer, mySite));
}

welcomEmail("짱구","aaa@a.com", "180505-1234567", "010-1234-1234", "jjang-goo's_site.com");