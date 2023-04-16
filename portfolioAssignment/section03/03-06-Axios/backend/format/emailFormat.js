export function getWelcomTemplate(userData, today){
    
    return `
        <html>
            <body>
                <h1>${userData.name}님 가입을 환경합니다.</h1>
                <hr>
                <div>이름: ${userData.name}</div>
                <div>휴대폰 번호: ${userData.phoneNum}</div>
                <div>내가 좋아하는 사이트: ${userData.url}</div>
                <div>가입일: ${today}</div>
            </body>
        </html>
    
    `
}