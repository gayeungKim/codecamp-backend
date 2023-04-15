export function getWelcomTemplate(name, email, registerNumber, phoneNumer, mySite){
    return `
        <html>
            <body>
                <h1>${name}님 가입을 환경합니다.</h1>
                <hr>
                <div>이메일: ${email}</div>
                <div>주민번호: ${registerNumber}</div>
                <div>휴대폰 번호: ${phoneNumer}</div>
                <div>내가 좋아하는 사이트: ${mySite}</div>
            </body>
        </html>
    
    `
}