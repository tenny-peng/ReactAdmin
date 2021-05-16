import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqProdById, reqCategoryList } from '../../api'
import { BASE_URL } from '../../config'
import { Card, Button, List, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import './detail.less'

const { Item } = List

@connect(
    state => (
        {
            list: state.list,
            categoryList: state.categoryList
        })
)
class Detail extends Component {

    state = {
        categoryId: '',
        categoryName: '',
        desc: '',
        detail: '',
        imgs: '',
        name: '',
        price: '',
        isLoading: true
    }

    getProdById = async(id) => {
        let result = await reqProdById(id)
        const { status, data, msg } = result
        if (status === 0) {
            this.categoryId = data.categoryId
            this.setState(data)
        } else {
            message.error(msg, 1)
        }
    }

    getCategoryList = async() => {
        let result = await reqCategoryList();
        const { status, data, msg } = result
        if (status === 0) {
            let result = data.find((item) => {
                return item._id === this.categoryId
            })
            if (result) {
                this.setState({ categoryName: result.name, isLoading: false })
            }
        } else {
            message.error(msg, 1)
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const reduxList = this.props.list
        const reduxCategoryList = this.props.categoryList
        if (reduxList.length) {
            let result = reduxList.find(item => item._id = id)
            if (result) {
                this.categoryId = result.categoryId
                this.setState(result)
            }
        } else {
            this.getProdById(id)
        }

        if (reduxCategoryList.length) {
            let result = reduxCategoryList.find(item =>item._id = this.categoryId)
            this.setState({ categoryName: result.name, isLoading: false })
        } else {
            this.getCategoryList()
        }
        
    }

    render() {
        return (
            <Card
                title={
                    <div className="left-top">
                        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => this.props.history.goBack()}></Button>
                        <span>商品详情</span>
                    </div>
                }
            >
                <List loading={this.state.isLoading}>
                    <Item>
                        <span className="prod-title">商品名称：</span>
                        <span>{this.state.name}</span>
                    </Item>
                    <Item>
                        <span className="prod-title">商品描述：</span>
                        <span>{this.state.desc}</span>
                    </Item>
                    <Item>
                        <span className="prod-title">商品价格：</span>
                        <span>{this.state.price}</span>
                    </Item>
                    <Item>
                        <span className="prod-title">商品分类：</span>
                        <span>{this.state.categoryName}</span>
                    </Item>
                    <Item>
                        <span className="prod-title">商品图片：</span>
                        {
                            this.state.imgs ? this.state.imgs.map((item,index) => {
                                return <img key={index} src={`${BASE_URL}/upload/` + item} alt="商品图片" style={{width: '200px'}} />
                            }): ''
                        }
                    </Item>
                    <Item>
                        <span className="prod-title">商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html: this.state.detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}

export default Detail