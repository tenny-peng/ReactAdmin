import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd';
import { deleteUserInfo } from '../../redux/actions/login'
import Header from './header'
import Nav from './nav'
import Home from '../../components/home'
import Category from '../category'
import Product from '../product'
import Detail from '../product/detail'
import AddUpdate from '../product/add_update'
import User from '../user'
import Role from '../role'
import Bar from '../bar'
import Line from '../line'
import Pie from '../pie'
import './css/admin.less'

const { Footer, Sider, Content } = Layout;

@connect(
    state => ({ userInfo: state.userInfo }),
    {
        deleteUserInfo
    }
)
class Admin extends Component {

    logout = () => {
        this.props.deleteUserInfo()
    }

    render() {
        const { isLogin } = this.props.userInfo
        if (!isLogin) {
            return <Redirect to="/login"/>
        } else {
            return (
                <Layout className="admin">
                    <Sider className="sider">
                        <Nav/>
                    </Sider>
                    <Layout>
                        <Header className="header">Header</Header>
                        <Content className="content">
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/prod_about/category" component={Category }/>
                                <Route path="/admin/prod_about/product" component={Product } exact/>
                                <Route path="/admin/prod_about/product/detail/:id" component={Detail }/>
                                <Route path="/admin/prod_about/product/add_update" component={AddUpdate } exact/>
                                <Route path="/admin/prod_about/product/add_update/:id" component={AddUpdate }/>
                                <Route path="/admin/user" component={User }/>
                                <Route path="/admin/role" component={Role }/>
                                <Route path="/admin/charts/bar" component={Bar }/>
                                <Route path="/admin/charts/line" component={Line }/>
                                <Route path="/admin/charts/pie" component={Pie} />
                                <Redirect to="/admin/home" />
                            </Switch>
                        </Content>
                        <Footer className="footer">推荐使用谷歌浏览器，获取最佳使用体验</Footer>
                    </Layout>
                </Layout>
            )
        }
    }
}

export default Admin
