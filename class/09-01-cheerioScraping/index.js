import axios from "axios";
import cheerio from "cheerio";

// 블로그 작성 기능
async function createBoardAPI(mydata) {
  // 1 입력된 컨텐츠에서 http로 시작하는 글자 있는지 확인
  const myurl = mydata.contents
    .split(" ")
    .filter((el) => el.includes("http"))[0];

  // 2 만약 있다면, 찾은 주소로 axios.get 요청해서 html 코드 받아오기 => 스크래핑
  const result = await axios.get(myurl);
  //   console.log(result.data);

  // 3 스프래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장
  const $ = cheerio.load(result.data);
  $("meta").each((index, el) => {
    if ($(el).attr("property")) {
      const key = $(el).attr("property").split(":")[1];
      const value = $(el).attr("content");
      console.log(key, value);
    }
  });
}

const frontendData = {
  title: "안녕",
  contents: "와 좋다. https://daum.net 임",
};

createBoardAPI(frontendData);
