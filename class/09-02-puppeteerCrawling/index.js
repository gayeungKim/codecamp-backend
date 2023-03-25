// 여기어때 크롤링 위법 사례: https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/
// 크롤링 코드 (크롤링: 스크래핑을 여러번)
import puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: true });
  // puppeteer 실행 -> 가상 브라우저를 변수에 저장
  // headless: true 브라우저 안뜸
  // headless: false 브라우저 뜸

  const page = await browser.newPage();
  // 해당 브라우저가 열릴 새로운 페이지 생성
  await page.setViewport({ width: 1280, height: 720 });
  // 브라우저 크기 지정
  await page.goto("https://www.goodchoice.kr/product/search/2");
  // 접속할 페이지 주소
  await page.waitForTimeout(1000);
  // 로딩 완료 대기

  const stage = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span",
    (el) => el.textContent
  );

  const location = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
    (el) => el.textContent
  );

  const price = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
    (el) => el.textContent
  );

  console.log(stage);
  console.log(location.trim());
  console.log(price);
}

startCrawling();
