const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(
  'mongodb://localhost:27017/qtum',
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log('connect db err...', err)
      process.exit(1)
    }
  }
)

const Post = require('./model/post')

const { QtumRPC, Contract } = require('qtumjs')
const repo = require('./solar.json')

const rpc = new QtumRPC('http://qtum:test@localhost:3889')
const myToken = new Contract(
  rpc,
  repo.contracts['openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol']
)

const ownerAddr = 'qcpwZourCVREiVp9xZQLjbzysmxsYsBxNg'

app.use(bodyParser.json())
app.use(cors())

app.post('/transfer', async (req, res) => {
  const { toAddr, name } = req.body
  try {
    const posts = await Post.find({ name })
    const tokens = posts.reduce((sum, post) => (sum = sum + post.token), 0)

    const tx = await myToken.send('transfer', [toAddr, tokens], {
      senderAddress: ownerAddr
    })

    console.log('transfer tx:', tx.txid)
    return res.json({ success: true })
  } catch (err) {
    console.log('transfer err...', err)
  }
})

app.post('/posts', async (req, res) => {
  const { content, name, title } = req.body
  const post = new Post({ content, name, title, token: 1 })
  try {
    await post.save()
    return res.json({ success: true })
  } catch (err) {
    console.log('save post err...', err)
  }
})

app.get('/:name/posts', async (req, res) => {
  const { name } = req.params
  try {
    const posts = await Post.find({ name })
    return res.json({ posts })
  } catch (err) {
    console.log(err)
  }
})

app.listen(3001, (req, res) => {
  console.log('running on port 3001')
})
