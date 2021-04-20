import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd';
import { deleteUserInfo } from '../../redux/actions/login'
import Header from './header'
import './css/admin.less'

const { Footer, Sider, Content } = Layout;

@connect(
    state => ({ userInfo: state.userInfo }),
    {
        deleteUserInfo
    }
)
class Admin extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    logout = () => {
        this.props.deleteUserInfo()
    }

    render() {
        const { isLogin, user } = this.props.userInfo
        if (!isLogin) {
            return <Redirect to="/login"/>
        } else {
            return (
                <Layout className="admin">
                    <Sider className="sider">Sider</Sider>
                    <Layout>
                        <Header className="header">Header</Header>
                        <Content className="content">Content</Content>
                        <Footer className="footer">推荐使用谷歌浏览器，获取最佳使用体验</Footer>
                    </Layout>
                </Layout>
            )
        }
    }
}

export default Admin
