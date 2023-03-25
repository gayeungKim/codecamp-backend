function getWelcomTemplate({ name, age, school, createdAt }) {
  //const {name, age, school, createdAt} = myuser

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

const myuser = {
  name: "영희",
  age: 12,
  school: "토끼",
  createdAt: "20230209",
};

getWelcomTemplate(myuser);
