function getWelcomTemplate({ name, age, school, createdAt }) {
  //  const {name, age, school, createdAt} = {name, age, school, createdAt}

  const result = `
  <html>
    <body>
      <h1>${name}님 가입을 환영</h1>
      <hr />
      <div>이름: ${name}</div>
      <div>나이: ${age}세</div>
      <div>학교: ${school}초등학교</div>
      <div>가입일: ${createdAt}</div>
    </body>
  </html>
  `;
  console.log(result);
}

const name = "영희";
const age = 12;
const school = "토끼";
const createdAt = "20230209";

getWelcomTemplate({ name, age, school, createdAt });
