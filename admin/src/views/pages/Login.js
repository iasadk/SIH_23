import { Input, Button, Spin, Row, Col, Typography, Image, Card } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import service from '../../services/admin';
import { AntdMsg } from '../../utils/Antd';
import util from '../../utils/util';

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [ajxRequesting, setAjxRequesting] = useState(false);

    const login = () => {
        setAjxRequesting(true);
        service.login({ code: userName, password: password }).then(res => {
            AntdMsg(res.message);
            util.setUserData(res.data);
            window.location.reload();
        }).catch((err) => {
            if (typeof err.message !== 'string') {
                AntdMsg(err.message[Object.keys(err.message)[0]][0], 'error');
            } else {
                AntdMsg(err.message, 'error')
            }
        }).finally(() => {
            setAjxRequesting(false);
        });
    }

    return (
        <>
            <Row justify="space-around" align="top" style={{ backgroundColor: "#fa680900", backgroundImage: "url('https://picsum.photos/1400/800')", height: '100vh', paddingTop: 60, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <Col style={{ backgroundColor: 'white', padding: '50px 0px' }}
                    xs={{ span: 22 }}
                    lg={{ span: 14 }}
                    xl={{ span: 10 }}
                >
                    <Row gutter={[60, 60]} align="middle" justify="space-around">
                        <Col>
                            <Image src="https://picsum.photos/180" preview={false} />
                        </Col>
                        <Col>
                            <Spin spinning={ajxRequesting} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                                <form onSubmit={e => { e.preventDefault(); }} autoComplete="off" spellCheck={false}>
                                    <Card hoverable={true} bodyStyle={{ width: 280 }}>
                                        <Typography.Title level={3} style={{ textAlign: 'center' }}>Welcome</Typography.Title>
                                        <Input
                                            style={{ margin: '10px 0px' }}
                                            size="middle"
                                            prefix={<UserOutlined />}
                                            value={userName}
                                            onChange={(e) => { setUserName(e.target.value) }}
                                            placeholder="Employee Code" />
                                        <Input.Password
                                            style={{ margin: '10px 0px' }}
                                            size="middle"
                                            prefix={<LockOutlined />}
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value) }}
                                            placeholder="Password" />
                                        <Button block type="primary" htmlType="submit" onClick={() => login()} style={{ margin: '10px 0px' }}>Login</Button>
                                    </Card>
                                </form>
                            </Spin>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};