const router = require('express').Router()
const { QtumRPC, Contract } = require('qtumjs')
const repo = require('./solar.json')

const rpc = new QtumRPC('http://qtum:test@localhost:3889')
const myToken = new Contract(
  rpc,
  repo.contracts['openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol']
)
const ownerAddr = 'qUGfvt4HxDk5qfFxpYJv1sNZh1wnXv7q1x'

router.post('/transfer', async (req, res) => {
  const { toAddr } = req.body
  try {
    const tx = await myToken.send('transfer', [toAddr, 5], {
      senderAddress: ownerAddr
    })

    console.log('transfer tx:', tx.txid)
    // const confirmation = await tx.confirm(1)
    // console.log('confirmation...', confirmation)

    return res.json({ success: true })
  } catch (err) {
    console.log('transfer err...')
  }
})

module.exports = router
