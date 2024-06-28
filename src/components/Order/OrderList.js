import backgroundPattern from '../../images/background-pattern.jpg';
import { Link } from 'react-router-dom';
import { ProFormRadio, ProFormSwitch, ProList } from '@ant-design/pro-components';
import { Badge, Avatar, List, Typography, Button, Tag, Col, Row, Statistic, Divider, ConfigProvider, Space, Progress, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import VirtualList from 'rc-virtual-list';
import API from '../API/API';
import { TruckOutlined } from '@ant-design/icons';

export default function OrderList() {
    const { Text } = Typography;
    const fakeDataUrl =
        'http://localhost:8080/api/order/list';
    const ContainerHeight = 150;
    const [data, setData] = useState([]);
    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                console.log(body);
                setData(data.concat(body));
            });
    };

    useEffect(() => {
        appendData();
    }, []);

    const onScroll = (e) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
            appendData();
        }
    };

    const colors1 = ['#6253E1', '#04BEFE'];
    const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
    const getHoverColors = (colors) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    const [cardActionProps, setCardActionProps] = useState('actions');

    const [ghost, setGhost] = useState(true);

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        API.get('order/list')
            .then(function (response) {
                setOrderList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function extractFilenames(inputString) {
        try {
            const inputArray = JSON.parse(inputString);
            const resultArray = [];
            for (let i = 0; i < inputArray.length; i++) {
                const filename = inputArray[i];
                const startIndex = filename.indexOf("_") + 1;
                const newFilename = filename.slice(startIndex);
                resultArray.push(newFilename);
            }
            return resultArray;
        } catch (error) {
            console.error("Invalid input JSON string.");
            return [];
        }
    }

    const renderData = () => {
        return orderList.map((value, key) => ({
            title: new Date(value.date).toLocaleDateString() + ' - ' + new Date(value.date).toLocaleTimeString(),
            subTitle: <Tag color="#5BD8A6">{value.description}</Tag>,
            avatar:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfz3upZJUzgki4bn27faJf6gPIIo7Yo5HxZg&s',
            content: (
                <div style={{ display: 'flex' }}>
                    <div style={{ width: 380, marginRight: 70 }}>
                        <List style={{ marginBottom: 20 }}>
                            <VirtualList
                                data={value.orderDetails}
                                height={ContainerHeight}
                                itemHeight={47}
                                itemKey="email"
                                onScroll={onScroll}
                            >
                                {(item) => (
                                    <List.Item key={item.product.id}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={require('../../images/' + extractFilenames(item.product.image)[0])} />}
                                            title={<a href="https://ant.design">{item.product.name}</a>}
                                            description={item.product.price + ' x ' + item.quantity}
                                        />
                                        <div>{(item.product.price * item.quantity)}</div>
                                    </List.Item>
                                )}
                            </VirtualList>
                        </List>
                        <Flex
                            align="center"
                            gap="small"
                            style={{
                                width: 350,
                            }}
                        >
                            <TruckOutlined />
                            <Progress percent={70} size="small" style={{ width: 250 }} showInfo={false} status='success' />
                            <Text type="success">Shipping</Text>
                        </Flex>
                    </div>
                    <div style={{ width: 230 }}>
                        <p>Payment Method: <Text type="warning">{value.paymentMethod}</Text></p>
                        <p>Status: <Badge status="success" text={value.status} style={{ marginLeft: 20 }} /></p>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic title="Total Price" value={value.total} precision={2} />
                            </Col>
                        </Row>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                                        colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                                        colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                                        lineWidth: 0,
                                    },
                                },
                            }}
                        >
                            <Button type="primary" size="large" style={{ marginRight: 10 }}>
                                <Link to={`/order/detail`} state={value}>View Detail</Link>
                            </Button>
                        </ConfigProvider>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                                        colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                                        colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                                        lineWidth: 0,
                                    },
                                },
                            }}
                        >
                            <Button type="primary" size="large" style={{ marginTop: 20 }}>
                                Buy Again
                            </Button>
                        </ConfigProvider>
                    </div>
                </div>
            )
        }))
    };

    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Orders</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Orders</span>
                        </nav>
                    </div>
                </div>
            </section>
            <div
                style={{
                    backgroundColor: '#eee',
                    margin: -24,
                    padding: 24,
                }}
            >
                {/* <ProFormRadio.Group
                    label="actions"
                    options={[
                        {
                            label: 'action',
                            value: 'actions',
                        },
                        {
                            label: 'extra',
                            value: 'extra',
                        },
                    ]}
                    fieldProps={{
                        value: cardActionProps,
                        onChange: (e) => setCardActionProps(e.target.value),
                    }}
                />
                <ProFormSwitch
                    label="ghost"
                    fieldProps={{
                        checked: ghost,
                        onChange: (e) => setGhost(e),
                    }}
                /> */}
                <ProList
                    ghost={ghost}
                    itemCardProps={{
                        ghost,
                    }}
                    pagination={{
                        defaultPageSize: 8,
                        showSizeChanger: false,
                    }}
                    showActions="hover"
                    rowSelection={{}}
                    grid={{ gutter: 16, column: 2 }}
                    onItem={(record) => {
                        return {
                            onMouseEnter: () => {
                                console.log(record);
                            },
                            onClick: () => {
                                console.log(record);
                            },
                        };
                    }}
                    metas={{
                        title: {},
                        subTitle: {},
                        type: {},
                        avatar: {},
                        content: {},
                    }}
                    dataSource={renderData()}
                />
            </div>
        </div>
    )
}