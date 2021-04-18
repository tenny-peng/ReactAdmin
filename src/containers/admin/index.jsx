import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUserInfo } from '../../redux/actions/login'

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
                <div>
                    Admin组件，你的名字是: {user.username}
                    <button onClick={ this.logout }>退出登录</button>
                </div>
            )
        }
    }
}

export default Admin
