import React, { Component } from 'react'
import { Card, Button, Table, message, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { reqCategoryList } from '../../api'
import { PAGE_SIZE } from '../../config'

const {Item} = Form

export default class Category extends Component {

    formRef = React.createRef()

    state = {
        categoryList: [],
        visible: false,
        operType: ''
    }

    componentDidMount() {
        this.getCategoryList()
    }

    getCategoryList = async() => {
        let result = await reqCategoryList()
        // console.log(result)
        const { status, data, msg } = result;
        if (status === 0) {
            this.setState({ categoryList: data })
        } else {
            message.error(msg, 1)
        }
    }

    showAdd = () => {
        this.setState({
            operType: 'add',
            visible: true
        });
    };

    showUpdate = () => {
        this.setState({
            operType: 'update',
            visible: true
        });
    };
    
    handleOk = async() => {
        try {
            const value = await this.formRef.current.validateFields()
            console.log(value)
        } catch (error) {
            console.log('表单输入项错误:', error);
            return
        }

        const { operType } = this.state
        if (operType === 'add') {
            console.log('你要新增')
        }
        if (operType === 'update') {
            console.log('你要修改')
        }

        
        this.setState({visible: false});
        this.formRef.current.resetFields()
    };
    
    handleCancel = () => {
        this.setState({visible: false});
        this.formRef.current.resetFields()
    };

    render() {
        const dataSource = this.state.categoryList
          
        const columns = [
            {
                title: '分类名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                // dataIndex: 'categoryName',
                key: 'handle',
                render: (d) => { return <Button type="link" onClick={this.showUpdate}>修改分类</Button> },
                width: '25%',
                align: 'center'
            }
        ];

        const {operType,visible } = this.state
        return (

            <div>
                <Card extra={<Button type="primary" icon={<PlusCircleOutlined />} onClick={this.showAdd}>添加</Button>}>
                    <Table dataSource={dataSource} columns={columns} bordered rowKey="_id" pagination={{pageSize: PAGE_SIZE}}/>;
                </Card>
                <Modal title={ operType === 'add'? '新增分类' : '修改分类' } visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} okText="确定" cancelText="取消">
                    <Form
                        ref={this.formRef}
                        name="category_form"
                        >
                        <Item
                            name="categoryName"
                            rules={[
                                { required: true, message: '分类名不能为空' }
                            ]}
                        >
                            <Input placeholder="分类名" />
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
