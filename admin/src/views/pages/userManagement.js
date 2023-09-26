/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Button, Form, Row, Col, Popconfirm, Modal, Spin, Typography, Select, Input, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import UserService from '../../services/user';
import UploadImage from '../../utils/UploadImage';
import Pagination from '../components/Pagination';
import { AntdMsg } from '../../utils/Antd';


export default function UserManagement() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [qData, setQData] = useState({ page: 1, limit: 20 });
    const addNewModalRef = useRef();
    const ModelModalRef = useRef();
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            width:100
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            width: 100,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 200,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: 180,
        },
    ].filter(item => !item.hidden);

    function list() {
        setLoading(true);
        UserService.listUser(qData).then(res => {
            setData(res.data?.map((v) => ({ ...v, key: v._id })));
            setQData({ ...qData, limit: res.extra.limit, page: res.extra.page, total: res.extra.total });
        }).catch(err => { }).finally(() => {
            setLoading(false);
        });
    }

    const deleteData = (id) => {
        UserService.deleteUser(id).then(res => {
            AntdMsg(res.message);
            list();
            setSelected([]);
        }).catch(err => {
            AntdMsg(err.message, 'error');
        })
    }

    const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));

    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';

    const tableProps = {
        bordered: true,
        loading,
        size: 'small',
        showHeader: true,
        footer: () => <Pagination {...{ qData, setQData }} />,
        rowSelection: {
            onChange: (selectedRowKeys) => {
                setSelected(selectedRowKeys);
            },
        },
        tableLayout: undefined,
    };

    useEffect(() => {
        list();
    }, [qData.page, qData.limit]);


    return (
        <>
            <Typography.Title level={5} style={{ marginTop: 0 }}>List of Users</Typography.Title>
            <Table
                {...tableProps}
                pagination={{ position: ['none'], pageSize: qData.limit }}
                columns={tableColumns}
                dataSource={data.length ? data : []}
                scroll={{ y: 'calc(100vh - 340px)', x: 'calc(100vw - 387px)' }}
            />
            <AddForm ref={addNewModalRef} {...{ list }} />
        </>
    );
};

function Search({ addNewModalRef, selected, deleteData, qData, setQData, list, }) {
    const onChange = (v, key) => {
        qData[key] = v;
        if (v === undefined || v === "") {
            delete qData[key];
            list();
        }
    };
    return (
        <Form onSubmitCapture={list} className="search-form">
            <Row gutter={[12, 2]}>
                <Col span={4}>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Input placeholder="Search by name" defaultValue={qData.key} onChange={e => onChange(e.target.value, "key")} allowClear />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item>
                        <Select value={qData.status} allowClear placeholder="Search By Status" onChange={e => { onChange(e, "status") }} >
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">Inactive</Select.Option>
                            <Select.Option value="blocked">Blocked</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button type="primary" htmlType="submit">Search</Button>
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item style={{ marginBottom: 0, float: 'right' }}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => { addNewModalRef.current.openForm() }}>Add New</Button>
                    </Form.Item>
                    {
                        selected.length
                            ? <Popconfirm
                                title="Are you sure to delete these selected images?. Be sure to delete the image from server."
                                onConfirm={() => { deleteData(selected); }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary" danger style={{ float: 'right' }} icon={<DeleteOutlined />}>Delete Selected</Button>
                            </Popconfirm>
                            : null
                    }
                </Col>
            </Row>
        </Form>
    );
};

const AddForm = forwardRef((props, ref) => {
    const { list } = props;
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({ aspect: 1 });
    const [ajxRequesting, setAjxRequesting] = useState(false);
    const [fileList, setFileList] = useState([]);


    const handleChange = (value) => { setData({ ...data, ...value }); }

    useImperativeHandle(ref, () => ({
        openForm(dt) {
            setOpen(true);
            setData(
                dt
                    ? { ...dt }
                    : { status: true }
            );
            if (dt?.avatar) {
                setFileList([dt.avatar]);
            } else {
                setFileList([]);
            }
        }
    }));

    const save = () => {
        setAjxRequesting(true);
        UserService.saveUser(data).then((res) => {
            AntdMsg(res.message);
            handleChange({ ...res.data });
            list();
            setOpen(false);
        }).catch(err => {
            if (typeof err.message === 'object') {
                let dt = err.message[Object.keys(err.message)[0]];
                AntdMsg(dt, 'error');
            } else {
                AntdMsg(err.message, 'error');
            }
        }).finally(() => {
            setAjxRequesting(false);
        });
    }

    useEffect(() => {
        handleChange({ avatar: fileList?.[0] });
    }, [fileList]);

    return (
        <>
            <Modal
                title={(!data._id ? 'Add' : 'Edit') + ' User'}
                style={{ top: 20 }}
                open={open}
                keyboard={false}
                onCancel={() => { setOpen(false); }}
                destroyOnClose
                maskClosable={false}
                width={800}
                className="app-modal-body"
                footer={null}
            >
                <Spin spinning={ajxRequesting} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                    <Form layout="vertical">
                        <Row gutter={[12, 2]}>
                            <Col span={20}>
                                <Row gutter={[12, 2]}>
                                    <Col span={12}>
                                        <Form.Item label="Username" required>
                                            <Input placeholder="John Doe" value={data.name} onChange={e => { handleChange({ name: e.target.value }) }} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label="Email" required>
                                            <Input placeholder="Email" value={data.email} onChange={e => { handleChange({ email: e.target.value }) }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Phone" required>
                                            <Input placeholder="Phone" type='number' value={data.phone} onChange={e => { handleChange({ phone: e.target.value }) }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Status" required>
                                            <Select value={data.status} onChange={e => { handleChange({ status: e }) }} >
                                                <Select.Option value="active">Active</Select.Option>
                                                <Select.Option value="inactive">Inactive</Select.Option>
                                                <Select.Option value="blocked">Blocked</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="Avatar">
                                    <UploadImage {...{ fileList, setFileList }} count={1} />
                                </Form.Item>
                            </Col>

                        </Row>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
});
