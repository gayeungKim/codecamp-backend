// 04의 api 요청을 받을 수 있도록 front와 연결

import express from 'express'
import * as db from './hardcoding.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'
import cors from 'cors'

const app = express()
// Cross-Origin-Resource-Sharing
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/users', function (req, res) {
    const result = db.users;
  res.send(result)
  console.log(result)
})

app.get('/starbucks', (req, res) => {
    const result = db.coffees;
    res.send(result);
    // console.log(result);
})

app.listen(3000, console.log("server listen..."))