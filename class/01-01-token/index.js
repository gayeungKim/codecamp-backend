console.log("안녕안녕");

function getToken(a) {
  //a: 매개변수(parameter)
  const result = String(Math.floor(Math.random() * 10 ** a)).padStart(a, "0");
  console.log(result);
}

getToken(3); // 인자 argument
