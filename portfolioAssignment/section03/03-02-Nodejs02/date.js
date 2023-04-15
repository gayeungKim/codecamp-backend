// 1 날짜/시간 생성기
function createTodayDate() {
    // const date1 = new Date();
    // console.log(date1);
    // const date2 = new Date()+"";
    // console.log(date2);
// 왜 다르달까나

    const date = new Date();
    // const time = date.toTimeString();
    // const timeformat = time.substr(0,8);
    // const YMD = date.toDateString();
    // console.log(YMD);
    console.log(`오늘은 ${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDay()}일 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} 입니다`);
    return;
}

createTodayDate();