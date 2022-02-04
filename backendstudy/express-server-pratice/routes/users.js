const express =  require('express')
const router = express.Router()

const users = [
  {id: 0, name: "진정우"},
  {id: 1, name: "김경은"},
  {id: 2, name: "정택구"}
]
router.get('/', (req, res) => {
  res.status(200).send(users)
})
router.get('/like', (req, res) => {
  res.send("안녕하세요")
})
router.get('/:id', (req, res) => {
  console.log(req.params.id)
  const { id } = req.params
  users[id] ? res.status(200).send(users[id])
  : res.status(400).send("값이 없음")
})
router.post('/', (req, res) => {
  // console.log(req.body)
  const newUserdata = req.body
  users.push(newUserdata)
  res.send(users)
})

module.exports = router