import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import screenfull from 'screenfull'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import { deleteUserInfo } from '../../../redux/actions/login'
import menuList from '../../../config/menu'
import { reqWeather } from '../../../api'
import './header.less'

const { confirm } = Modal;

@connect(
    state => ({
        userInfo: state.userInfo,
        title: state.title
    }),
    {deleteUserInfo}
)
@withRouter
class Header extends Component {

    state = {
        isFull: false,
        date: dayjs().format('YYYY年MM月DD日 HH:mm:ss'),
        weatherInfo: {},
        title: ''
    }

    getWeather = async () => {
        let result = await reqWeather('440300')
        let weatherInfo = result.lives[0];
        this.setState({weatherInfo})
    }

    componentDidMount() {
        screenfull.on('change',() => {
            let isFull = !this.state.isFull
            this.setState({isFull})
        })
        this.timer = setInterval(() => {
            this.setState({date: dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
        }, 1000)
        this.getWeather()
        this.getTitle()
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    fullScreen = () => {
        screenfull.toggle()
    }

    logOut = () => {
        let { deleteUserInfo } = this.props;

        confirm({
            cancelText: '取消',
            okText: '确定',
            content: '确定退出？',
            icon: <QuestionCircleOutlined />,
            onOk() {
                deleteUserInfo()
            },
            onCancel() {
            },
        });
    }

    getTitle = () => {
        let pathKey = this.props.location.pathname.split('/').reverse()[0]
        let title = ''
        menuList.forEach((item) => {
            if (item.children) {
                let rcitem = item.children.find((citem) => {
                    return citem.key === pathKey
                })
                if (rcitem) {
                    title = rcitem.title
                }
            } else {
                if (item.key === pathKey) {
                    title = item.title
                }
            }
        })
        this.setState({title})
    }
 
    render() {
        let { isFull, date, weatherInfo } = this.state
        let { user } = this.props.userInfo
        return (
            <header className="header">
                <div className="header-top">
                    <Button onClick={ this.fullScreen} size="small" icon={isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined /> } />
                    <span className="username">欢迎，{ user.username}</span>
                    <Button onClick={ this.logOut } type="link" size="small">退出登录</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {this.props.title || this.state.title}
                    </div>
                    <div className="header-bottom-right">
                        { date }
                        <img src="http://www.weather.com.cn/m/i/icon_weather/42x30/d00.gif" alt="天气信息"></img>
                        {weatherInfo.weather} &nbsp;&nbsp;&nbsp;温度：{ weatherInfo.temperature }
                    </div>
                </div>
            </header>
        )
    }
}

export default  Header