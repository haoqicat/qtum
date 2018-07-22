import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

class Home extends Component {
  state = {
    toAddr: ''
  }

  handleChange = e => {
    this.setState({ toAddr: e.target.value })
  }

  handleSubmit = () => {
    const url = 'http://localhost:3001/transfer'
    const { toAddr } = this.state
    const { name } = this.props
    axios.post(url, { toAddr, name }).then(res => {
      if (res.data.success) {
        alert('转币操作已提交到区块链')
      }
    })
    this.setState({ toAddr: '' })
  }

  render() {
    return (
      <div>
        <Content>
          <Input
            placeholder="十六进制支付地址"
            value={this.state.toAddr}
            onChange={this.handleChange}
          />
          <Button onClick={this.handleSubmit}>提现</Button>
        </Content>
      </div>
    )
  }
}

export default Home

const Content = styled.div`
  padding: 16px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`

const Input = styled.input`
  padding: 16px;
  width: 100%;
  max-width: 600px;
  height: 48px;
  border: 1px solid #ccc;
  margin-top: 24px;
  margin-bottom: 24px;
  &:focus {
    outline: none;
  }
`

const Button = styled.div`
  margin: 24px auto;
  border: 2px solid #212121;
  width: 160px;
  line-height: 40px;
  text-align: center;
  color: #212121;
  font-size: 18px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    border: 2px solid #00bcd4;
  }
`
