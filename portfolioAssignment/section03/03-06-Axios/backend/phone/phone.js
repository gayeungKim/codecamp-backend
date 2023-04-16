import coolsms from 'coolsms-node-sdk';

export function checkValidationPhone(num01, num02) {
    // 받아온 번호가 올바른 형식인지 확인
    // 자릿수 + 구성은 숫자만
    const num01_check = num01.replaceAll(/[^0-9]/g, "");
    const num02_check = num01.replaceAll(/[^0-9]/g, "");

    if(num01_check === undefined || num02_check === undefined) {
        console.log("전화번호 형식 오류");
        return false;
    } else {
        const result = (num01_check.length ==4) && (num02_check.length ==4 );
        if(!result) console.log("전화번호 형식 오류");

        return result;
    }
}

// 6자리 랜덤한 토큰 전송!
export function getToken() {
    const count = 6;
    // padStart(maxlength, replace) : 문자열 길이에 미치지 못할경우 대체로 채움!
    return String(Math.floor(Math.random() *10 **count)).padStart(count,"0");
}

export async function sendTokenToSMS(myphone, token) {
    // const SMS_KEY = "..."
    // const SMS_SECRET = "..."
    // const SMS_SENDER = "..."

    // 다음 값들은 보안에 취약하기 때문에 .env 파일에서 관리
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;
    const SMS_SENDER = process.env.SMS_SENDER;

    // sdk 가져오기
    const mysms = coolsms.default;
    const messageService = new mysms(SMS_KEY, SMS_SECRET);

    // const result = await messageService.sendOne({
    //     to: myphone,
    //     from: SMS_SENDER,
    //     text: `[실습03] ${myphone} 이 요청하신 인증번호는 [${token}] 입니다.`
    // })
    // .then(res => console.log(res))
    // .catch(err => console.error(err));

    // promis pending이 일어남 => async await를 걸어주면 result를 확인할 수 있음
    // console.log(myphone + ' 번호로 인증번호' + token + '전송!');

    // console.log(result);
    // return result;

    // 실습으로 문자 발송 확인!
    console.log("인증번호 전송 완료");
    return token;
}