import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveTitle} from '../../../redux/actions/menu'
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import menuList from '../../../config/menu'
import logo from '../../../static/imgs/logo.png'
import './nav.less'

const { SubMenu, Item } = Menu;

@connect(
    state => ({
        menus: state.userInfo.user.role.menus,
        username: state.userInfo.user.username
    }),
    {
        saveTitle
    }
)
@withRouter
class Nav extends Component {
    state = {
        collapsed: false,
    };

    createMenu = (target) => {
        const { menus, username } = this.props
        return target.map((item) => {
            if (username === 'admin' || menus.indexOf(item.key) !== -1) {
                if (!item.children) {
                    return (
                        <Item key={item.key} icon={React.createElement(Icon[item.icon])} onClick={() => { this.props.saveTitle(item.title) }}>
                            <Link to={item.path}>{item.title}</Link>
                        </Item>
                    )
                } else {
                    return (
                        <SubMenu key={item.key} title={item.title} icon={React.createElement(Icon[item.icon])}>
                            {this.createMenu(item.children)}
                        </SubMenu>
                    )
                }
            } else {
                return ''
            }
        })
    }


    render() {
        return (
            <div>
                <header className="nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </header>
                <Menu
                    selectedKeys={this.props.location.pathname.indexOf('product') !== -1 ? 'product' : this.props.location.pathname.split('/').reverse()[0]}
                    defaultOpenKeys={this.props.location.pathname.split('/').splice(2)}
                    mode="inline"
                    theme="dark"
                >
                    {this.createMenu(menuList)}
                </Menu>
            </div>
        )
    }
}

export default Nav
