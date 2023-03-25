function getWelcomTemplate(name, age, school, createdAt) {
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
const myname = "철수";
const myage = 13;
const myschool = "다람쥐";
const mycreatedAt = "20230209";

getWelcomTemplate(myname, myage, myschool, mycreatedAt);
