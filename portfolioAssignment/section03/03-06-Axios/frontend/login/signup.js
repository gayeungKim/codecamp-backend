// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  const num01 = document.getElementById('PhoneNumber02').value;
  const num02 = document.getElementById('PhoneNumber03').value;
  // const myphone = document.getElementById('PhoneNumber01').value + 
  // document.getElementById('PhoneNumber02').value + 
  // document.getElementById('PhoneNumber03').value;
  
  console.log(`입력받은 번호: 010-${num01}-${num02}`);

  const result = await axios.post('http://localhost:3000/tokens/phone', {
    num01: num01,
    num02: num02,
  }).then(async (res) => {

    // console.log("전달한 인자",res.data);
    

    return res.data;
  })
  // 토큰 받음 !!
  console.log("전달받은 토큰")
  console.log(result);
  // return result;

}

const openInput = async () => {
  const gettoken = getValidationNumber();
  if(gettoken !== undefined) {
    OpenTokenInput();
    return gettoken;
  }
}

const submitToken = async () => {
  const token = document.getElementById('getToekn');
  console.log(token);
  const inputToken = document.getElementById('TokenInput');
  console.log(inputToken);
  
  const isEquals = (inputToken === token) ? true : false;
        
  console.log(isEquals);
  return isEquals;
}



// 회원 가입 API 요청
const submitSignup = async () => {
  // 객체로 전달!
  const req = {
    name: document.getElementById('SignupName').value,
    registNum: document.getElementById('SignupPersonal').value,
    phoneNum: document.getElementById('PhoneNumber01').value
    + document.getElementById('PhoneNumber02').value
    + document.getElementById('PhoneNumber03').value,
    url: document.getElementById('SignupPrefer').value,
    email: document.getElementById('SignupEmail').value,
    pw: document.getElementById('SignupPwd').value,
  }
  console.log(req);

  const result = await axios.post('http://localhost:3000/users', req).
  then(async (res) => {
    console.log(res.data);
    return res.data;
  })
  console.log(result);
  console.log('회원 가입 이메일 전송')
}
