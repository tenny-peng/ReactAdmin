import React, { Component } from 'react'
import { Button } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import screenfull from 'screenfull'
import './header.less'

export default class Header extends Component {

    state = {
        isFull: false
    }

    fullScreen = () => {
        screenfull.toggle()
    }

    componentDidMount() {
        screenfull.on('change',() => {
            let isFull = !this.state.isFull
            this.setState({isFull})
        })
    }
    
    render() {
        let { isFull } = this.state
        return (
            <header className="header">
                <div className="header-top">
                    <Button onClick={ this.fullScreen} size="small" icon={isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined /> } />
                    <span className="username">欢迎，佩奇</span>
                    <Button type="link" size="small">退出登录</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        柱状图
                    </div>
                    <div className="header-bottom-right">
                        2021-04-21 20:33:24
                        <img src="http://www.weather.com.cn/m/i/icon_weather/42x30/d00.gif" alt="天气信息"></img>
                        晴&nbsp;&nbsp;&nbsp;温度：20~22
                    </div>
                </div>
            </header>
        )
    }
}
