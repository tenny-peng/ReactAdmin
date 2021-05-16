import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Table, Modal, Form, Input, message, Tree } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
import { PAGE_SIZE } from '../../config'
import { reqRoleList, reqAddRole, reqAuthRole } from '../../api'
import menuList from '../../config/menu'


const {Item} = Form

@connect(
    state => ({ username: state.userInfo.user.username}),
    {}
)
class Role extends Component {

    formRef = React.createRef()

    state = {
        isShowAdd: false,
        isShowAuth: false,
        operaType: 'add',
        isLoading: false,
        roleList: [],
        menuList,
        checkedKeys: [],
        _id: ''
    }

    getRoleList = async() => {
        let result = await reqRoleList()
        const { status, data, msg } = result
        if (status === 0) {
            this.setState({ roleList: data })
        } else {
            message.error(msg)
        }
    }

    componentDidMount() {
        this.getRoleList()
    }

    handleOk = async () => {
        try {
            const value = await this.formRef.current.validateFields()
            let result = await reqAddRole(value)
            const { status, msg } = result
            if (status === 0) {
                message.success('新增角色成功')
                this.setState({ isShowAdd: false })
                this.getRoleList()
            } else {
                message.error(msg)
            }
        } catch (error) {
            console.log('表单输入项错误:', error);
            return
        }
    }

    handleCancel = () => {
        this.setState({isShowAdd: false})
    }

    handleAuthOk = async() => {
        const { _id, checkedKeys } = this.state
        const { username } = this.props
        let result = await reqAuthRole({ _id, menus: checkedKeys, auth_name: username })
        const { status, msg } = result
        if (status === 0) {
            message.success('授权成功')
            this.setState({ isShowAuth: false })
            this.getRoleList()
        } else {
            message.error(msg)
        }
    }

    handleAuthCancel = () => {
        this.setState({isShowAuth: false})
    }

    onExpand = (expandedKeys) => {
        this.setState({expandedKeys})
    };
    
    onCheck = (checkedKeys) => {
        this.setState({checkedKeys})
    };

    showAdd = () => {
        this.setState({ isShowAdd: true })
        if (this.formRef.current) {
            this.formRef.current.resetFields()   
        }
    }

    showAuth = (_id) => {
        const { roleList } = this.state
        let result = roleList.find(item => {
            return item._id === _id
        })
        if (result) {
            this.setState({ checkedKeys: result.menus })
        }
        this.setState({_id, isShowAuth: true})
    }

    render() {
        const dataSource =this.state.roleList

        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: time => dayjs(time).format('YYYY年MM月DD日 HH:mm:ss')
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                key: 'auth_time',
                render: time => time ? dayjs(time).format('YYYY年MM月DD日 HH:mm:ss') : '' 
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                key: 'auth_name'
            },
            {
                title: '操作',
                key: 'option',
                render: (item) => <Button type="link" onClick={() => this.showAuth(item._id) }>设置权限</Button>
            }
        ]

        const treeData = this.state.menuList

        const { operaType, isLoading, isShowAdd, isShowAuth, checkedKeys } = this.state
        return (
            <div>
                <Card title={<Button type="primary" icon={<PlusCircleOutlined />} onClick={() => this.showAdd()}>新增角色</Button>}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        bordered
                        rowKey="_id"
                        pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
                        loading={isLoading} />
                </Card>
                <Modal title={ (operaType === 'add'? '新增' : '修改')  + '角色 '} visible={isShowAdd} onOk={this.handleOk} onCancel={this.handleCancel} okText="确定" cancelText="取消">
                    <Form
                        ref={this.formRef}
                        name="authForm"
                        >
                        <Item
                            name="roleName"
                            rules={[
                                { required: true, message: '角色名不能为空' }
                            ]}
                        >
                            <Input placeholder="角色名"/>
                        </Item>
                    </Form>
                </Modal>
                <Modal title='设置权限' visible={isShowAuth} onOk={this.handleAuthOk} onCancel={this.handleAuthCancel} okText="确定" cancelText="取消">
                <Tree
                    checkable
                    onExpand={this.onExpand}
                    onCheck={this.onCheck}
                    checkedKeys={checkedKeys}
                    treeData={treeData}
                    defaultExpandAll
                    />
                </Modal>
            </div>
        )
    }
}

export default Role
