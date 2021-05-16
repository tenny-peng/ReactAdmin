import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqCategoryList, reqAddProduct, reqProdById, reqUpdateProduct } from '../../api'
import { Card, Button, Form, Input, Select, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import PicturesWall from './pictures_wall'
import RickTextEditor from './rich_text_editor'

const { Item } = Form
const { Option } = Select

@connect(
    state => ({
        categoryList: state.categoryList,
        list: state.list
    })
)
class AddUpdate extends Component {
    
    formRef = React.createRef()
    pictureWallRef = React.createRef()
    richTextEditorRef = React.createRef()

    state = {
        categoryList: [],
        operaType: 'add',
        categoryId: '',
        desc: '',
        detail: '',
        imgs: '',
        name: '',
        price: '',
        _id: '',
        isLoading: false
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

    getProduct = async(id) => {
        let result = reqProdById(id)
        const { status, data, msg } = result
        if (status === 0) {
            this.setState(data)
            this.pictureWallRef.current.setFileList(data.imgs)
            this.richTextEditorRef.current.setRichText(data.detail)
        } else {
            message.error(msg)
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        if (id) {
            this.setState({operaType: 'update'})
        }

        const { categoryList, list } = this.props
        if (categoryList.length) {
            this.setState({ categoryList })
        } else {
            this.getCategoryList()
        }

        if (list.length) {
            let result = list.find((item) => {
                return item._id === id
            })
            if (result) {
                this.setState(result)
                this.formRef.current.setFieldsValue(result)
                this.pictureWallRef.current.setFileList(result.imgs)
                this.richTextEditorRef.current.setRichText(result.detail)
            }
        } else {
            this.getProduct(id)
        }

    }

    onFinish = async(values) => {
        let imgs = this.pictureWallRef.current.getImgArr()
        let detail = this.richTextEditorRef.current.getRichText();
        let result
        const { operaType, _id} = this.state
        if (operaType === 'add') {
            result = await reqAddProduct({ ...values, imgs, detail, pCategoryId: 'xxx' })
        } else {
            result = await reqUpdateProduct({ ...values, imgs, detail, pCategoryId: 'xxx', _id })
        }
        const { status, msg } = result
        if (status === 0) {
            message.success((operaType === 'add' ? '新增' : '修改') + '商品成功')
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
                        <span>{ this.state.operaType === 'add' ? '新增' : '修改'}商品</span>
                    </div>
                }
            >
                <Form
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 10 }}
                    ref={this.formRef}
                    >
                    <Item
                        label="商品名称："
                        name="name"
                        rules={[{ required: true, message: '请输入商品名称' }]}
                        initialValue={this.state.categoryId || ''}
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
                        <PicturesWall ref={this.pictureWallRef}/>
                    </Item>
                    <Item
                        label="商品详情："
                        name="detail"
                    >
                        <RickTextEditor ref={this.richTextEditorRef}/>
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
