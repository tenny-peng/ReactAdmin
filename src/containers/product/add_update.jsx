import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqCategoryList } from '../../api'
import { Card, Button, Form, Input, Select, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import PicturesWall from './pictures_wall'

const { Item } = Form
const { Option } = Select

@connect(
    state => ({ categoryList: state.categoryList })
)
class AddUpdate extends Component {

    state = {
        categoryList:[]
    }

    getCategoryList = async() => {
        let result = await reqCategoryList();
        const { status, data, msg} = result
        if (status === 0) {
            this.setState({ categoryList: data })
        } else {
            message.error(msg)
        }
    }

    componentDidMount() {
        const { categoryList } = this.props
        if (categoryList.length) {
            this.setState({ categoryList })
        } else {
            this.getCategoryList()
        }
    }

    onFinish = (values) => {
        console.log(values)
    };

    onFinishFailed = (values) => {
        console.log(values)
    };

    render() {
        return (
            <Card
                title={
                    <div>
                        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => this.props.history.goBack()}></Button>
                        <span>添加商品</span>
                    </div>
                }
            >
                <Form
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
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
                        name="price"
                        rules={[{ required: true, message: '请输入商品价格' }]}
                    >
                        <Input type="number" prefix="￥" addonAfter="元"/>
                    </Item>
                    <Item
                        label="商品分类："
                        name="type"
                        rules={[{ required: true, message: '请选择商品分类' }]}
                    >
                        <Select placeholder="请选择分类" allowClear>
                            {
                                this.state.categoryList.map((item) => {
                                    return <Option key={ item._id} value={ item._id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Item>
                    <Item
                        label="商品图片："
                        name="imgs"
                        wrapperCol={{md:14}}
                    >
                        <PicturesWall/>
                    </Item>
                    <Item
                        label="商品详情："
                        name="detail"
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

export default AddUpdate
