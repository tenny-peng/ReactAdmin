import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveList } from '../../redux/actions/list'
import { Card, Button, Select, Input, Table, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { reqProductList, reqUpdateProdStatus, reqSearchProduct } from '../../api'
import { PAGE_SIZE } from '../../config'

const { Option } = Select;

@connect(
    state => ({}),
    {saveList}
)
class Product extends Component {

    state = {
        productList: [],
        total: 0,
        current: 1,
        searchType: 'productName',
        keyWord: ''
    }

    componentDidMount() {
        this.getProductList()
    }

    getProductList = async (number = 1) => {
        let result
        if (this.isSearch) {
            const { searchType, keyWord } = this.state
            result = await reqSearchProduct(1, PAGE_SIZE, searchType, keyWord)
        } else {
            result = await reqProductList(number, PAGE_SIZE)
        }
        const { status, data, msg } = result;
        if (status === 0) {
            this.setState({
                productList: data.list,
                total: data.total,
                current: data.pageNum
            })
            this.props.saveList(data.list)
        } else {
            message.error(msg, 1)
        }
    }

    search = async () => {
        this.isSearch = true
        this.getProductList()
    }

    updateProdStatus = async({_id, status}) => {
        if (status === 1) {
            status = 2
        } else {
            status = 1
        }
        let result = await reqUpdateProdStatus(_id, status)
        if (result.status === 0) {
            let productList = [...this.state.productList]
            productList.map(item => {
                if (item._id === _id) {
                    item.status = status
                }
                return item
            })
            this.setState({productList})
            message.success('更新商品状态成功')
        } else {
            message.error('更新商品状态失败')
        }
    }

    render() {
        const dataSource = this.state.productList
          
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                width: '20%',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                align: 'center',
                width: '8%',
                key: 'price',
                render: price => '￥' + price
            },
            {
                title: '状态',
                // dataIndex: 'status',
                align: 'center',
                width: '8%',
                key: 'status',
                render: item => {
                    const { status } = item
                    return (
                        <div>
                            <Button
                                type={status === 1 ? 'danger' : 'prim ary'}
                                onClick={(item) => { this.updateProdStatus(item) }}
                            >
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <br />
                            <span>{ status === 1 ? '在售' : '已停售' }</span>
                        </div>
                    )
                 }
            },
            {
                title: '操作',
                // dataIndex: 'opera',
                align: 'center',
                width: '8%',
                key: 'opera',
                render: (item) => {
                    return (
                        <div>
                            <Button type="link"  onClick={ () => this.props.history.push(`/admin/prod_about/product/detail/${item._id}`) }>详情</Button><br/>
                            <Button type="link"  onClick={ () => this.props.history.push(`/admin/prod_about/product/add_update/${item._id}`) }>修改</Button>
                        </div>
                    )
                }
            },
        ];

        return (
            <Card
                title={
                    <div>
                        <Select defaultValue="productName" onChange={(value) => {this.setState({searchType: value}) }}>
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                        <Input
                            placeholder="请输入搜索关键字"
                            style={{ margin: '0 10px', width: '20%' }}
                            allowClear
                            onChange={(event) => {this.setState({keyWord: event.target.value}) }}
                        />
                        <Button type="primary" icon={<SearchOutlined />} onClick={this.search}>搜索</Button>
                    </div>
                    
                }
                extra={<Button type="primary" icon={<PlusOutlined />} onClick={ _ => this.props.history.push('/admin/prod_about/product/add_update') }>添加商品</Button>}
            >
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    rowKey='_id'
                    pagination={{
                        total: this.state.total,
                        pageSize: PAGE_SIZE,
                        current: this.state.current,
                        onChange: this.getProductList
                    }}
                />
            </Card>
        )
    }
}


export default Product