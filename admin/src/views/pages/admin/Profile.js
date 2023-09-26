/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Spin, Row, Col, Typography, Divider, Switch } from 'antd';
import { PageHeader } from '@ant-design/pro-layout'
import { LoadingOutlined } from '@ant-design/icons';
import greetingTime from 'greeting-time';

import React, { useEffect, useState } from 'react';
import service from '../../../services/admin';
import { AntdMsg } from '../../../utils/Antd';
import UploadImage from '../../../utils/UploadImage';

export default function Profile() {

    const [data, setData] = useState({});
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [doSave, setDoSave] = useState(false);

    const handleChange = (v, k) => { setData({ ...data, [k]: v }); }

    function list() {
        setLoading(true);
        service.profile().then(res => {
            setData(res.data.result || {});
            if (res.data.result?.avatar) {
                setFileList([res.data.result?.avatar]);
            }
        }).catch(err => {
            AntdMsg(err.message, 'error');
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        list();
    }, []);

    useEffect(() => {
        updateProfile();
    }, [data]);

    function updateProfile() {
        if (doSave) {
            setLoading(true);
            service.saveProfile(data).then(res => {
                AntdMsg(res.message);
            }).catch(err => {
                AntdMsg(err.message, 'error');
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    useEffect(() => {
        handleChange(fileList?.[0], 'avatar');
    }, [fileList]);

    return (
        <>
            <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                <PageHeader
                    title={greetingTime(new Date()) + ', ' + data?.name}
                    extra={[<Switch key={'do-save'} checkedChildren="Update" unCheckedChildren="Update" checked={doSave} onChange={v => { setDoSave(v) }} />]}
                />
                <Divider />
                <Form layout="vertical">
                    <Row gutter={[12, 2]}>
                        <Col span={16}>
                            <Row gutter={[12, 10]}>
                                <Col span={12}>
                                    <Form.Item label={<Typography.Text style={{marginBottom:"5px"}} strong type="secondary">Name</Typography.Text>}>
                                        <Typography.Title editable={{ editing: doSave, triggerType: doSave ? 'icon' : 'text', onChange: (v) => { handleChange(v, 'name'); } }} level={5} >
                                            {data.name}
                                        </Typography.Title>
                                        <Divider style={{ margin: 0 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={<Typography.Text style={{marginBottom:"5px"}} strong type="secondary">User Name</Typography.Text>}>
                                        <Typography.Title editable={{ editing: doSave, triggerType: doSave ? 'icon' : 'text', onChange: (v) => { handleChange(v, 'userName'); } }} level={5} >
                                            {data.userName}
                                        </Typography.Title>
                                        <Divider style={{ margin: 0 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={<Typography.Text style={{marginBottom:"5px"}} strong type="secondary">Email</Typography.Text>}>
                                        <Typography.Title editable={{ editing: doSave, triggerType: doSave ? 'icon' : 'text', onChange: (v) => { handleChange(v, 'email'); } }} level={5} >
                                            {data.email}
                                        </Typography.Title>
                                        <Divider style={{ margin: 0 }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={<Typography.Text style={{marginBottom:"5px"}} strong type="secondary">Phone Number</Typography.Text>}>
                                        <Typography.Title editable={{ editing: doSave, triggerType: doSave ? 'icon' : 'text', onChange: (v) => { handleChange(v, 'phone'); } }} level={5} >
                                            {data.phone}
                                        </Typography.Title>
                                        <Divider style={{ margin: 0 }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <UploadImage {...{ fileList, setFileList }} disabled={!doSave} cropImage />

                        </Col>
                    </Row>
                </Form>
            </Spin>
        </>
    );
};