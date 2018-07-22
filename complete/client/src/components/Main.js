import React, { Component } from 'react'
import { Router } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import NewPost from './NewPost'
import Profile from './Profile'
import '../assets/global.css'

export const history = createBrowserHistory()
class Main extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={NewPost} />
          <Route path="/:name/posts" component={Profile} />
        </Switch>
      </Router>
    )
  }
}

export default Main
