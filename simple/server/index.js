const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
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
  const { toAddr } = req.body
  console.log(toAddr)
  try {
    const tx = await myToken.send('transfer', [toAddr, 5], {
      senderAddress: ownerAddr
    })

    console.log('transfer tx:', tx.txid)
    // const confirmation = await tx.confirm(1)
    // console.log('confirmation...', confirmation)

    return res.json({ success: true })
  } catch (err) {
    console.log('transfer err...', err)
  }
})

app.listen(3001, (req, res) => {
  console.log('running on port 3001')
})
