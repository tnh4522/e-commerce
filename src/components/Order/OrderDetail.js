import { Popover, Steps } from 'antd';
import { useLocation } from "react-router-dom";
import { Card, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function OrderDetail() {
    const customDot = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    step {index} status: {status}
                </span>
            }
        >
            {dot}
        </Popover>
    );

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

    const location = useLocation();
    const order = location.state;

    const renderProduct = (item) => {
        return item.map((product, index) => {
            return (
                <Card key={index} style={{ marginTop: 10 }}>
                    <Row>
                        <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={require('../../images/' + extractFilenames(product.product.image)[0])} alt={product.product.name} style={{ width: '50%' }} />
                        </Col>
                        <Col span={14}>
                            <h3>{product.product.name}</h3>
                            <p>Price: {product.product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                        </Col>
                        <Col span={4}>
                            <p style={{color: 'black', fontWeight: 700}}>Sub Price: {product.product.price * product.quantity + ' VND'}</p>
                        </Col>
                    </Row>
                </Card>
            )
        })
    }

    return (
        <div style={{ padding: 20, width: '80%', margin: 'auto' }}>
            <Steps
                current={1}
                progressDot={customDot}
                items={[
                    {
                        title: 'Confirmed',
                        description: <UserOutlined style={{ color: 'black', fontSize: 20 }} />,
                    },
                    {
                        title: 'Payment',
                    },
                    {
                        title: 'Processing',
                    },
                    {
                        title: 'Success',
                    },
                ]}
            />
            <Card style={{ marginTop: 30, backgroundColor: '#f0f2f5' }}>
                <Row>
                    <Col span={12}>
                        <Card title='Shipping Info' style={{ marginRight: 10 }}>
                            <p>Order ID: {order.description}</p>
                            <p>Name: {order.name}</p>
                            <p>Phone: {order.phone}</p>
                            <p>Address: {order.address}</p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title='Payment Info'>
                            <p>Order Date: {new Date(order.date).toLocaleDateString() + ' - ' + new Date(order.date).toLocaleTimeString()}</p>
                            <p>Payment Method: {order.paymentMethod}</p>
                            <p>Payment Status: {order.status}</p>
                            <p style={{color: 'black', fontWeight: 700}}>Total Price: {order.total + ' VND'}</p>
                        </Card>
                    </Col>
                </Row>
                {renderProduct(order.orderDetails)}
            </Card>
        </div>
    )
}