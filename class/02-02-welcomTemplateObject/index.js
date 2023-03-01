function getWelcomTemplate(user) {
  const result = `
  <html>
    <body>
      <h1>${user.name}님 가입을 환영</h1>
      <hr />
      <div>이름: ${user.name}</div>
      <div>나이: ${user.age}세</div>
      <div>학교: ${user.school}초등학교</div>
      <div>가입일: ${user.createdAt}</div>
    </body>
  </html>
  `;
  console.log(result);
}

const myuser = {
  name: "철수",
  age: 13,
  school: "다람쥐",
  createdAt: "20230209",
};

getWelcomTemplate(myuser);
