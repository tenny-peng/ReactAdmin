import React, { Component } from 'react'
import { Button } from 'antd'
import 'antd/dist/antd.css'

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

