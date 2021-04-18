import React, { Component } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import './App.less'
import Login from './containers/login'
import Admin from './containers/admin'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Redirect to="/admin"/>
        </Switch>
      </div>
    )
  }
}

