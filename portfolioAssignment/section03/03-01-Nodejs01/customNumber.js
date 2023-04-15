// 1 유효한 주민번호 확인
export function isValidRegistrationNumber(registrationNumber){
    // 받아온 인자 string으로 변환
    let check = registrationNumber + "";
    // division이 '-'인지 확인하기 위해 문자열에서 받아옴
    let division = check.charAt(6);
    // '-'이후 7자리인지 확인하기 위해 문자열에서 받아옴
    let bNumber = registrationNumber.substr(7);

    // division이 '-'이 아닌경우
    if(division != '-'){
        console.log('형식이 올바르지 않다');
        return;
    } else if(bNumber.length !=7){ // 뒷자리가 7자리가 아닌경우
        console.log('뒷자리 숫자가 잘못됨');
        return;
    } else { // 형식이 올바르다면 return으로 주민번호 넘겨줌
        // console.log('올바른 형식');
        return check;
    }

}

// 2 주민번호 암호화
// isValidNuber에서 넘겨받은 주민번호 암호화
export function custom(validNumber){
    let customNumber = validNumber + "";
    let customedNumber = customNumber.substr(0,8) + "******";

    // 암호화된 주민번호 출력하고 return
    // console.log("암호화된 주민번호: "+customedNumber);
    return customedNumber;
}