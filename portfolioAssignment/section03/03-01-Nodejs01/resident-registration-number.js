// 1 주민번호 만들기
// 뒷자리를 가리는 함수(customRegistrationNumber)를 하나 만들고 해당 함수에
// 주민번호를 넣었을 경우 암호화해서 출력할 것

// 조건: 퍼사드패턴 사용!
import { isValidRegistrationNumber, custom } from "./customNumber.js";

function customRegistrationNumber(inputregistrationNumber){
    // 1 유효한 주민번호인지 확인: "6자리숫자" + "-" + "7자리숫자"
    const validNumber = isValidRegistrationNumber(inputregistrationNumber);

    // 2 주민번호 암호화
    if(!validNumber){ // return 값이 없다면
        return; // validNumber 함수를 실행하지 않을 것
    } else { // return 값이 있다면
        const customResulte = custom(validNumber); // validNumber 함수를 실행할 것
        console.log(`암호화된 주민번호 :  + ${custom} `);
    }
}

customRegistrationNumber('000000-0000000'); // 형식이 올바를때
customRegistrationNumber('000000-000000000000'); // 숫자가 넘었을 때
customRegistrationNumber('0000000000000'); // 형식이 올바르지 않을 때