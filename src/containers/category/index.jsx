import React, { Component } from 'react'
import { Card, Button, Table, message, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { reqCategoryList, reqAddCategory, reqUpdateCategory } from '../../api'
import { PAGE_SIZE } from '../../config'

const {Item} = Form

export default class Category extends Component {

    formRef = React.createRef()

    state = {
        categoryList: [],
        visible: false,
        operType: '',
        isLoading: true,
        modalCurrentValue: '',
        modalCurrentId: ''
    }

    componentDidMount() {
        this.getCategoryList()
    }

    getCategoryList = async() => {
        let result = await reqCategoryList()
        this.setState({isLoading: false})
        const { status, data, msg } = result;
        if (status === 0) {
            this.setState({ categoryList: data.reverse() })
        } else {
            message.error(msg, 1)
        }
    }

    showAdd = () => {
        this.setState({
            operType: 'add',
            modalCurrentValue: '',
            modalCurrentId: '',
            visible: true
        });
    };

    showUpdate = (item) => {
        const { _id, name } = item
        this.setState({
            modalCurrentValue: name,
            modalCurrentId: _id,
            operType: 'update',
            visible: true  
        });
        setTimeout(() => {
            this.formRef.current.setFieldsValue({categoryName:name})
        }, 100)
    };

    toAdd = async(value) => {
        let result = await reqAddCategory(value)
        const { status, msg } = result;
        if (status === 0) {
            message.success('新增商品分类成功')
            this.getCategoryList()
            this.setState({ visible: false });
            this.formRef.current.resetFields()
        }
        if (status === 1) {
            message.error(msg, 1)
        }
    }

    toUpdate = async(value) => {
        let result = await reqUpdateCategory(value);
        const { status, msg } = result;
        if (status === 0) {
            message.success('更新分类名称成功', 1)
            this.getCategoryList()
            this.setState({ visible: false });
            this.formRef.current.resetFields()
        } else {
            message.error(msg)
        }
    }
    
    handleOk = async() => {
        try {
            const value = await this.formRef.current.validateFields()
            const { operType } = this.state
            if (operType === 'add') {
                this.toAdd(value)
            }
            if (operType === 'update') {
                this.toUpdate({categoryId: this.state.modalCurrentId, categoryName: value.categoryName })
            }
        } catch (error) {
            console.log('表单输入项错误:', error);
            return
        }

        
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
                render: (item) => { return <Button type="link" onClick={()=>this.showUpdate(item)}>修改分类</Button> },
                width: '25%',
                align: 'center'
            }
        ];

        const {operType, visible, isLoading} = this.state
        return (

            <div>
                <Card extra={<Button type="primary" icon={<PlusCircleOutlined />} onClick={this.showAdd}>添加</Button>}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        bordered
                        rowKey="_id"
                        pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
                        loading={isLoading} />
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
                            <Input placeholder="分类名"/>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
