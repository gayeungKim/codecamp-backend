// 여기어때 크롤링 위법 사례: https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/
// 크롤링 코드 (크롤링: 스크래핑을 여러번)
import puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  // puppeteer 실행 -> 가상 브라우저를 변수에 저장
  // headless: true 브라우저 안뜸
  // headless: false 브라우저 뜸

  const page = await browser.newPage();
  // 해당 브라우저가 열릴 새로운 페이지 생성
  await page.setViewport({ width: 1280, height: 720 });
  // 브라우저 크기 지정
  await page.goto("https://finance.naver.com/item/sise.naver?code=005930");
  // 접속할 페이지 주소
  // 서버에 부하를 준다 = get 요청이 많다
  // goto = 페이지 접속을 위한 get.api 요청 => goto가 많아지면 부하가 커진다
  await page.waitForTimeout(1000);
  // 로딩 완료 대기
  // goto가 늘어났을 경우 wait가 없다면 디노스 공격으로 오인 가능
  // wait time을 랜덤하게 적용하기도

  const framePage = await page
    .frames()
    .find((el) => el.url().includes("/item/sise_day.naver?code=005930"));
  // ifram 찾기

  for (let i = 3; i <= 7; i++) {
    // date 관련 data를 여러개 가져오기 위해 규칙 확인후 for 문
    const date = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
      (el) => el.textContent
    );

    const price = await framePage.$eval(
      // price 관련 data를 여러개 가져오기 위해 규칙 확인후 for 문
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
      (el) => el.textContent
    );

    console.log(`날짜: ${date}, 가격: ${price}`);
  }
  await browser.close();
}

startCrawling();
