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
            message.success((operaType === 'add' ? '??????' : '??????') + '????????????')
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
                        <span>{ this.state.operaType === 'add' ? '??????' : '??????'}??????</span>
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
                        label="???????????????"
                        name="name"
                        rules={[{ required: true, message: '?????????????????????' }]}
                        initialValue={this.state.categoryId || ''}
                    >
                        <Input placeholder="????????????"/>
                    </Item>
                    <Item
                        label="???????????????"
                        name="desc"
                        rules={[{ required: true, message: '?????????????????????' }]}
                    >
                        <Input placeholder="????????????"/>
                    </Item>
                    <Item
                        label="???????????????"
                        name="price"
                        rules={[{ required: true, message: '?????????????????????' }]}
                    >
                        <Input type="number" prefix="???" addonAfter="???"/>
                    </Item>
                    <Item
                        label="???????????????"
                        name="categoryId"
                        rules={[{ required: true, message: '?????????????????????' }]}
                    >
                        <Select placeholder="???????????????" allowClear>
                            {
                                this.state.categoryList.map((item) => {
                                    return <Option key={ item._id} value={ item._id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Item>
                    <Item
                        label="???????????????"
                        name="imgs"
                    >
                        <PicturesWall ref={this.pictureWallRef}/>
                    </Item>
                    <Item
                        label="???????????????"
                        name="detail"
                    >
                        <RickTextEditor ref={this.richTextEditorRef}/>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">
                            ??????
                        </Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default AddUpdate
