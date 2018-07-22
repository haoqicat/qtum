import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Incentive from './Incentive'

class Profile extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    const path = this.props.location.pathname.split('/')
    axios.get(`http://localhost:3001/${path[1]}/posts`).then(res => {
      this.setState({ posts: res.data.posts })
    })
  }

  render() {
    const { posts } = this.state
    const path = this.props.location.pathname.split('/')
    return (
      <div>
        <Content>
          <PostList>
            <Title>
              <Name>作者</Name>
              <Desc>标题</Desc>
              <Details>内容</Details>
              <Token>奖励</Token>
            </Title>
            {posts.map(post => {
              return (
                <Post key={post._id}>
                  <Name>{post.name}</Name>
                  <Desc>{post.title}</Desc>
                  <Details>{post.content}</Details>
                  <Token>{post.token}</Token>
                </Post>
              )
            })}
          </PostList>
        </Content>

        <Incentive posts={posts} name={path[1]} />
      </div>
    )
  }
}

export default Profile

const Content = styled.div`
  padding: 16px;
  background-color: #f5f7f9;
  margin-bottom: 32px;
`

const PostList = styled.div`
  padding: 32px 0;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ececec;
  padding: 8px 0;
`

const Post = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ececec;
  padding: 16px 0;
`

const Name = styled.div`
  width: 20%;
  flex-shrink: 1;
  color: ${props => props.color};
`

const Desc = styled.div`
  width: 30%;
`

const Token = styled.div`
  width: 10%;
`

const Details = styled.div`
  width: 40%;
`
