import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

class NewPost extends Component {
  state = {
    content: '',
    title: '',
    name: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    const url = 'http://localhost:3001/posts'
    const { content, name, title } = this.state
    const data = { content, name, title }
    axios
      .post(url, data)
      .then(res => {
        console.log(res.data.success)
        this.props.history.push(`${name}/posts`)
      })
      .catch(err => {
        console.log('发布帖子失败')
      })
  }

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value })
  }

  render() {
    return (
      <Wrapper>
        <Content>
          <Input
            placeholder="用户名"
            value={this.state.name}
            onChange={e => this.handleChange(e, 'name')}
          />
          <Input
            placeholder="标题"
            value={this.state.title}
            onChange={e => this.handleChange(e, 'title')}
          />
          <Textarea
            onChange={e => this.handleChange(e, 'content')}
            value={this.state.content}
            placeholder="写点儿什么..."
          />
          <Button onClick={this.handleSubmit}>发布</Button>
        </Content>
      </Wrapper>
    )
  }
}

export default NewPost

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7f9;
`

const Content = styled.div`
  padding: 16px;
  width: 100%;
  max-width: 600px;
`

const Textarea = styled.textarea`
  padding: 16px;
  width: 100%;
  height: 350px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
  }
`

const Input = styled.input`
  padding: 16px;
  width: 100%;
  max-width: 600px;
  height: 48px;
  border: 1px solid #ccc;
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
