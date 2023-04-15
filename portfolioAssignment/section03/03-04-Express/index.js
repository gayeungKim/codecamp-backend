import express from 'express'

// * : 해당 모듈에서 모두 호출하겠다는 것, as 필수!
import * as db from './hardcoding.js'

// swagger 사용으로 아래 호출
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'

const app = express()

// swagger setup 형식
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));


// 1 회원 목록을 조회하는 api 작성
// 조건
// a Get 방식
// b endPoint = /users
// c api 요청 시 하드코딩된 회원 5명의 데이터를 받아와야함
// d 각 회원은 email, name, phone, personal(주민번호 앞자리), prefer(사이트) 포함
app.get('/users', function (req, res) {
    const result = db.users;
  // api 요청시 반환값
  res.send(result)
  // api 요청시 console에 응답!
  console.log(result)
})

app.get('/starbucks', (req, res) => {
    const result = db.coffees;
    res.send(result);
    console.log(result);
})


app.listen(3000)
