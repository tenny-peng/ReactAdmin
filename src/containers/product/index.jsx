import React, { Component } from 'react'
import { Card, Button, Select, Input, Table } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class Product extends Component {

    handleChange = (value) => {
        console.log(`selected ${value}`);
      }

    render() {
        const dataSource = [
            {
                key: '1',
                name: '华为xxx手机',
                desc: '国产手机的骄傲--华为',
                price: '4999',
                status: '在售'
            },
            {
                key: '2',
                name: 'Applexxx手机',
                desc: '顶尖科技的手机',
                price: '8999',
                status: '在售'
            },
          ];
          
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
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
                key: 'price',
                render: price => '￥' + price
            },
            {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
                key: 'status',
                render: status => {
                    return (
                        <div>
                            <Button type="primary">下架</Button><br/>
                            <span>{ status }</span>
                        </div>
                    )
                 }
            },
            {
                title: '操作',
                dataIndex: 'opera',
                align: 'center',
                key: 'opera',
                render: () => {
                    return (
                        <div>
                            <Button type="link">详情</Button><br/>
                            <Button type="link">修改</Button>
                        </div>
                    )
                }
            },
        ];

        return (
            <Card
                title={
                    <div>
                        <Select defaultValue="name" onChange={this.handleChange}>
                            <Option value="name">按名称搜索</Option>
                            <Option value="desc">按描述搜索</Option>
                        </Select>
                        <Input
                            placeholder="请输入搜索关键字"
                            style={{ margin: '0 10px', width: '20%' }}
                            allowClear
                        />
                        <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                    </div>
                    
                }
                extra={<Button type="primary" icon={<PlusOutlined />}>添加商品</Button>}
            >
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                />
            </Card>
        )
    }
}
