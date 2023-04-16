// 04의 api 요청을 받을 수 있도록 front와 연결
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import cors from 'cors';
import 'dotenv/config';
import * as db from './db/hardcoding.js';
import * as phone from './phone/phone.js';
import * as email from './email/email.js';
import * as formatDate from './format/dateFormat.js';
import * as formatEmail from './format/emailFormat.js';

const app = express()
// Cross-Origin-Resource-Sharing
app.use(express.json())
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/users', function (req, res) {
  const result = db.users;
  console.log(result)
  res.send(result)
})

app.post('/users', function (req, res) {
  console.log(req.body);
  console.log("사용자 데이터 받아옴")
  // 1 이메일이 정상인지 확인
  // 객체로 받아온 req의 email 확인
  // console.log(req.body.email);
  // const email = req.body.email;
  const isValidEmail = email.checkValidationEmail(req.body.email);
  // 잘 받아왔는지의 여부를 확인
  console.log(isValidEmail);

  // 2 가입환영 템플릿
  const today = formatDate.getToday();
  // 오늘 날짜
  // console.log(today);

  const template = formatEmail.getWelcomTemplate(req.body, today);
  // console.log(result);
  
  // 3 이메일 전송
  email.sendTemplateToEmail(req.body.email, template);

  res.send("전송완료");
  // console.log(result);
  // return result;

})


app.get('/starbucks', (req, res) => {
  const result = db.coffees;
  console.log(result);
  res.send(result);
})

// api로 요청 받을 것은(전달받은 인자)는 vsCode에서
// 확인 가능!
app.post('/tokens/phone', async (req, res) => {
  const num01 = req.body.num01;
  const num02 = req.body.num02;
  const isValid = phone.checkValidationPhone(num01, num02);

  if(isValid === false){
    res.send("형식이 잘못된 전화번호입니다");
  } else {
    const token = phone.getToken();
    const result = phone.sendTokenToSMS('010'+num01+num02, token);
    res.send(await result);
  }
})

app.listen(3000, console.log("server listen..."));