import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqCategoryList, reqAddProduct } from '../../api'
import { Card, Button, Form, Input, Select, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import PicturesWall from './pictures_wall'
import RickTextEditor from './rich_text_editor'

const { Item } = Form
const { Option } = Select

@connect(
    state => ({ categoryList: state.categoryList })
)
class AddUpdate extends Component {

    pictureWall = React.createRef()
    richTextEditor = React.createRef()

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

    onFinish = async(values) => {
        let imgs = this.pictureWall.current.getImgArr()
        let detail = this.richTextEditor.current.getRichText();
        let result = await reqAddProduct({ ...values, imgs, detail, pCategoryId: 'xxx' })
        const { status, msg } = result
        if (status === 0) {
            message.success('添加商品成功')
            this.props.history.replace('/admin/prod_about/product')
        } else {
            message.error(msg)
        }
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
                    labelCol={{span:2}}
                    wrapperCol={{span:10}}
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
                        name="categoryId"
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
                    >
                        <PicturesWall ref={this.pictureWall}/>
                    </Item>
                    <Item
                        label="商品详情："
                        name="detail"
                    >
                        <RickTextEditor ref={this.richTextEditor}/>
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
