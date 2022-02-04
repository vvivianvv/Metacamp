const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const path = require('path')

const usersRouter = require('./routes/users')

const app = express()
const port = 3000

app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.get('/', (req, res, next) => {
  next()
}, (req, res) => {
  res.status(200).send('Hello, 익스프레스!!')
})

app.use('/users', usersRouter)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send(err.message)
})

app.post('/', (req, res) => {
  console.log('post 실행')
  console.log("바디:", req.body)
  res.send('post 실행')
})

app.listen(port, () => {
  console.log(`${port}번 포트에서 실행 중!`)
})