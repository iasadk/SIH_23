/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Button, Form, Row, Col, Popconfirm, Modal, Spin, Typography, Select, Input, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import service from '../../services/subscriber';
import Pagination from '../components/Pagination';
import { AntdMsg } from '../../utils/Antd';
import moment from 'moment'
export default function Subscribe() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [qData, setQData] = useState({ page: 1 });
    const addNewModalRef = useRef();
    const columns = [
        {
            title: '#',
            width: 40,
            render: (v, row, i) => <b>{i + 1}</b>
        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Subscribed At',
            dataIndex: 'createdAt',
            render: (v, row) => <span>{moment(row.createdAt).format('DD MMM YYYY')} </span>
        },
        {
            title: 'Action',
            dataIndex: '_id',
            width: 70,
            render: (v, row) => {
                return <>
                    <Popconfirm
                        title="Are you sure to delete this User?"
                        onConfirm={() => { deleteData(row._id); }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" size='small' danger icon={<DeleteOutlined />} />&nbsp;
                    </Popconfirm>
                </>
            }
        },
    ].filter(item => !item.hidden);

    function list() {
        setLoading(true);
        service.list(qData).then(res => {

            setData(res.data?.map((v) => ({ key: v._id, ...v })).reverse());
            setQData({ ...qData, limit: res.extra.limit, page: res.extra.page, total: res.extra.total });
        }).catch(err => { }).finally(() => {
            setLoading(false);
        });
    }

    const deleteData = (id) => {
        service.delete(id).then(res => {
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
        title: () => <Search {...{ addNewModalRef, selected, deleteData, qData, setQData, list, }} />,
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
            <Typography.Title level={5} style={{ marginTop: 0 }}>List of Subscriber</Typography.Title>
            <Table
                {...tableProps}
                pagination={{ position: ['none'], pageSize: qData.limit }}
                columns={tableColumns}
                dataSource={data.length ? data : []}
                scroll={{ y: 'calc(100vh - 340px)', x: 'calc(100vw - 387px)' }}
            />
            {/* <AddForm ref={addNewModalRef} {...{ list }} /> */}
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
                        <Input placeholder="Search by name or code" defaultValue={qData.key} onChange={e => onChange(e.target.value,"key")} allowClear />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button type="primary" htmlType="submit">Search</Button>
                    </Form.Item>
                </Col>
                <Col span={5}>
                    {/* <Form.Item style={{ marginBottom: 0, float: 'right' }}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => { addNewModalRef.current.openForm() }}>Add New</Button>
                    </Form.Item> */}
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


    const handleChange = (value) => {

        Object.entries(value).forEach(ent => {
            let varDt = data;
            const k = ent[0];
            const v = ent[1];
            let keys = k.split('.');
            for (let i = 0; i < keys.length; i++) {
                if (i + 1 === keys.length) {
                    varDt[keys[i]] = v;
                } else {
                    if (typeof varDt[keys[i]] === 'undefined') {
                        if (parseInt(keys[i + 1]) * 1 >= 0) {
                            varDt[keys[i]] = [];
                        } else {
                            varDt[keys[i]] = {};
                        }
                    } varDt = varDt[keys[i]];
                }
            }
        });
        setData({ ...data });
    }

    useImperativeHandle(ref, () => ({
        openForm(dt) {
            setOpen(true);
            setData(
                dt
                    ? { _id: dt }
                    : { fileType: 'photo' }
            );
        }
    }));

    const getDetails = () => {
        setAjxRequesting(true);
        service.details(data._id).then(res => {
            setData(res.data || {});
        }).catch(err => {
            AntdMsg(err.message, 'error');
        }).finally(() => {
            setAjxRequesting(false);
        });
    }

    const save = () => {
        setAjxRequesting(true);
        service.save(data).then((res) => {
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
        if (data._id) {
            getDetails();
        }
    }, [data._id]);

    useEffect(() => {
        if (!open) {
            setData({ _id: null });
        }
    }, [open]);

    useEffect(() => {
        console.log('data', data);
    }, [data]);

    return (
        <>
            <Modal
                title={(!data._id ? 'Add' : 'Edit') + ' User'}
                style={{ top: 20 }}
                open={open}
                okText="Save"
                keyboard={false}
                onOk={save}
                okButtonProps={{ disabled: ajxRequesting }}
                onCancel={() => { setOpen(false); }}
                destroyOnClose
                maskClosable={false}
                width={500}
                className="app-modal-body"
                footer={[
                    <Button key="cancel" onClick={() => { setOpen(false); }}>Cancel</Button>,
                    <Button key="save" type="primary" onClick={save}>Save</Button>,
                ]}
            >
                <Spin spinning={ajxRequesting} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                    <Form layout="vertical">
                        <Row gutter={[12, 2]}>

                            <Col span={24}>
                                <Form.Item label="Type" required>
                                    <Select value={data.type} onChange={e => { handleChange({ type: e }) }} >
                                        <Select.Option value={'address'}>Address</Select.Option>
                                        <Select.Option value={'phone'}>Phone</Select.Option>
                                        <Select.Option value={'email'}>Email</Select.Option>
                                        <Select.Option value={'facebookUrl'}>Facebook</Select.Option>
                                        <Select.Option value={'linkeinUrl'}>LinkedIn</Select.Option>
                                        <Select.Option value={'instagramUrl'}>Instagram</Select.Option>
                                        <Select.Option value={'twitterUrl'}>Twitter</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Data" required>
                                    <Input placeholder={data.type === "address" || "phone" || "email" || "facebookUrl" || "linkeinUrl" || "instagramUrl" || "twitterUrl" ? data.type : ""} value={data.data} onChange={e => { handleChange({ data: e.target.value }) }} />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Status" required>
                                    <Select value={data.status} onChange={e => { handleChange({ status: e }) }} >
                                        <Select.Option value={true}>Active</Select.Option>
                                        <Select.Option value={false}>Inactive</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
});
