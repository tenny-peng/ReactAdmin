import React, { Component } from 'react'
import { connect } from 'react-redux'
import {demo1, demo2 } from '../../redux/actions/test'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './css/index.less'
import logo from './imgs/logo.png'

const {Item} = Form

class Login extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    onFinish = (values) => {
        this.props.demo2('0199')
        // console.log('Received values of form: ', values);
    };
  
    pwdValidator = (_, value) => {
        if (!value) {
            return Promise.reject(new Error('密码不能为空'))
        }
        if (value.length < 4) {
            return Promise.reject(new Error('密码不能小于4位'))
        }
        if (value.length > 12) {
            return Promise.reject(new Error('密码不能大于12位'))
        }
        if (!(/^\w+$/).test(value)) {
            return Promise.reject(new Error('密码必须是字母、数字、下划线'))
        }
        return Promise.resolve()
    }

    render() {
        return (
            <div className="login">
                <header>
                    <img src={logo} alt="logo"/>
                    <h1>商品管理系统{ this.props.test}</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                        >
                        <Item
                            name="username"
                            rules={[
                                { required: true, message: '请输入用户名！' },
                                { max: 12, message: "用户名不能大于12位" },
                                { min: 4, message: "用户名不能小于4位" },
                                { pattern: /^\w+$/, message: "用户名必须是字母、数字、下划线组成" }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Item>
                        <Item
                            name="password"
                            rules={[{ validator: this.pwdValidator }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}


export default connect(
    state => ({ test: state.test }),
    {
        demo1,
        demo2
    }
)(Login)