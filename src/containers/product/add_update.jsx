import React, { Component } from 'react'
import { Card, Button, Form, Input, Select } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Item } = Form
const { Option } = Select

export default class AddUpdate extends Component {

    onFinish = async(values) => {
        console.log(values)
        
    };

    render() {
        return (
            <Card
                title={
                    <div className="left-top">
                        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => this.props.history.goBack()}></Button>
                        <span>添加商品</span>
                    </div>
                }
            >
                <Form
                    onFinish={this.onFinish}
                    labelCol={{md:2}}
                    wrapperCol={{md:8}}
                    >
                    <Item
                        label="商品名称："
                        name="name"
                        rules={[{ required: true, message: '请输入商品名称' }]}
                    >
                        <Input placeholder="商品名称"/>
                    </Item>

                    <Item
                        label="商品描述："
                        name="desc"
                        rules={[{ required: true, message: '请输入商品描述' }]}
                    >
                        <Input placeholder="商品描述"/>
                    </Item>
                    <Item
                        label="商品价格："
                        name="desc"
                        rules={[{ required: true, message: '请输入商品价格' }]}
                    >
                        <Input type="number" prefix="￥" addonAfter="元"/>
                    </Item>
                    <Item
                        label="商品分类："
                        name="type"
                        rules={[{ required: true, message: '请选择商品分类' }]}
                    >
                        <Select>
                            <Option value="demo">Demo</Option>
                            <Option value="demo2">Demo2</Option>
                        </Select>
                    </Item>
                    <Item
                        label="商品图片："
                        name="desc"
                        rules={[{ required: true, message: '请输入商品价格' }]}
                    >
                        此处为照片墙
                    </Item>
                    <Item
                        label="商品详情："
                        name="desc"
                        rules={[{ required: true, message: '请输入商品价格' }]}
                    >
                        此处为富文本框
                    </Item>

                    <Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
