import React, { Component } from 'react'
import './App.less'
import { Button } from 'antd'

export default class App extends Component {
  render() {
    return (
      <div>
        App
         <Button type="primary">一个antd的按钮</Button>
      </div>
    )
  }
}

