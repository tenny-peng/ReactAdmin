import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, message, Select } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
import { PAGE_SIZE } from '../../config'
import { reqUserList, reqAddUser } from '../../api'


const { Item } = Form
const { Option } = Select

export default class User extends Component {

    formRef = React.createRef()

    state = {
        isLoading: false,
        isShowAdd: false,
        userList: [],
        roleList: []
    }

    getUserList = async() => {
        let result = await reqUserList()
        const { status, data, msg } = result
        if (status === 0) {
            this.setState({
                userList: data.users.reverse(),
                roleList: data.roles
            })
        } else {
            message.error(msg)
        }
    }

    componentDidMount() {
        this.getUserList()
    }

    handleOk = async() => {
        try {
            const value = await this.formRef.current.validateFields()
            let result = await reqAddUser(value)
            const { status, data, msg } = result
            if (status === 0) {
                let userList = [...this.state.userList]
                userList.unshift(data)
                this.setState({userList, isShowAdd: false})
                message.success('添加用户成功')
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

    render() {
        const { isLoading, isShowAdd, userList } = this.state
        
        const dataSource = userList

        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: time => dayjs(time).format('YYYY年MM月DD日 HH:mm:ss')
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
                render: (id) => {
                    let result = this.state.roleList.find(item => {
                        return item._id === id
                    })
                    if (result) {
                        return result.name
                    }
                }
            },
            {
                title: '操作',
                key: 'option',
                render: (item) => <Button type="link" onClick={() => {} }>修改</Button>
            }
        ]

        return (
            <div>
                <Card title={<Button type="primary" icon={<PlusCircleOutlined />} onClick={() => { this.setState({ isShowAdd: true }); if(this.formRef.current) this.formRef.current.resetFields() }}>新增用户</Button>}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        bordered
                        rowKey="_id"
                        pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
                        loading={isLoading} />
                </Card>
                <Modal title='新增用户' visible={isShowAdd} onOk={this.handleOk} onCancel={this.handleCancel} okText="确定" cancelText="取消">
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                        ref={this.formRef}
                        name="userForm"
                        >
                        <Item
                            label="用户名："
                            name="username"
                            rules={[{ required: true, message: '用户名不能为空' }]}
                        >
                            <Input placeholder="用户名"/>
                        </Item>
                        <Item
                            label="密码："
                            name="password"
                            rules={[{ required: true, message: '密码不能为空' }]}
                        >
                            <Input placeholder="密码"/>
                        </Item>
                        <Item
                            label="手机号："
                            name="phone"
                            rules={[{ required: true, message: '手机号不能为空' }]}
                        >
                            <Input placeholder="手机号"/>
                        </Item>
                        <Item
                            label="邮箱："
                            name="email"
                            rules={[{ required: true, message: '邮箱不能为空' }]}
                        >
                            <Input placeholder="邮箱"/>
                        </Item>
                        <Item
                            label="角色："
                            name="role_id"
                            rules={[{ required: true, message: '角色不能为空' }]}
                        >
                            <Select placeholder="请选择角色" allowClear>
                            {
                                this.state.roleList.map((item) => {
                                    return <Option key={item._id} value={item._id}>{item.name}</Option>
                                })
                            }
                        </Select>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
