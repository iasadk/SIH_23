/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Button, Form, Row, Col, Popconfirm, Modal, Spin, Typography, Select, Input, Tag, DatePicker } from 'antd';
import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import service from '../../services/pickup';
import Pagination from '../components/Pagination';
import { AntdMsg } from '../../utils/Antd';
import moment from 'moment'
import UserManagement from './userManagement';
import dayjs from 'dayjs';

export default function PickUp() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [qData, setQData] = useState({ page: 1 });
    const addNewModalRef = useRef();
    const userModalRef = useRef();
    const columns = [
        {
            title: '#',
            width: 40,
            render: (v, row, i) => <b>{i + 1}</b>
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',

        },
        {
            title: 'Purchased Date',
            dataIndex: 'purchaseDate',
            render: (v, row) => <span>{moment(row.purchaseDate).format('DD MMM YYYY')} </span>
        },
        {
            title: 'User Details',
            dataIndex: 'purchaseDate',
            render: (v, row) => <Button
                type="primary"
                size="small"
                onClick={() => {
                    userModalRef.current.openForm(row);
                }}
            >
                User Detail
            </Button>
        },
        {
            title: 'Product Condition',
            dataIndex: 'condition',
        },
        {
            title: 'Estimated Credit',
            dataIndex: 'approxCredit',
        },
        {
            title: 'Original Price',
            dataIndex: 'orgPrice',
        },
        {
            title: 'Pick Up Date',
            dataIndex: 'pickUpDate',
            render: (v) => (<p>{v || "Not Confirmed"}</p>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
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
                    <Button
                        type="primary"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => {
                            addNewModalRef.current.openForm(row);
                        }}
                    />
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
            <Typography.Title level={5} style={{ marginTop: 0 }}>List of Pick Ups</Typography.Title>
            <Table
                {...tableProps}
                pagination={{ position: ['none'], pageSize: qData.limit }}
                columns={tableColumns}
                dataSource={data.length ? data : []}
                scroll={{ y: 'calc(100vh - 340px)', x: 'calc(100vw - 387px)' }}
            />
            <AddForm ref={addNewModalRef} {...{ list }} />
            <UserDetailModal ref={userModalRef} {...{ list }} />
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
                        <Input placeholder="Search by name or code" defaultValue={qData.key} onChange={e => onChange(e.target.value, "key")} allowClear />
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
    const dateFormat = 'YYYY/MM/DD';


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
                    ? { ...dt }
                    : {}
            );
        }
    }));


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
        if (!open) {
            setData({ _id: null });
        }
    }, [open]);

    useEffect(() => {
        console.log('data', data);
    }, [data]);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    function disabledDate(current) {
        // Get the current date
        const currentDate = new Date();

        // Disable dates that are before the current date
        return current && current < currentDate.setHours(0, 0, 0, 0);
    }

    return (
        <>
            <Modal
                title={(!data._id ? 'Add' : 'Edit') + ' Pick Up Request'}
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
                                    <Select value={data.status} onChange={e => { handleChange({ status: e }) }}>
                                        <Select.Option value={'Initiated'}>Initiated</Select.Option>
                                        <Select.Option value={'Pick Up Confirmed'}>Pick Up Confirmed</Select.Option>
                                        <Select.Option value={'Pick Up Failed'}>Pick Up Failed</Select.Option>
                                        <Select.Option value={'Credited'}>Credited</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            {data.status === "Pick Up Confirmed" && <Col span={24}>
                                <Form.Item label="Pick Up Date" required>
                                    <DatePicker onChange={(date, dateString) => { handleChange({ pickUpDate: dateString }) }} disabledDate={disabledDate} value={data.pickUpDate ? dayjs(data.pickUpDate, dateFormat) : ""} format={dateFormat} />
                                </Form.Item>
                            </Col>}
                        </Row>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
});


const UserDetailModal = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({ aspect: 1 });

    useImperativeHandle(ref, () => ({
        openForm(dt) {
            setOpen(true);
            setData({ ...dt });
        }
    }));

    return (
        <>
            <Modal
                style={{ top: 20 }}
                open={open}
                okText="Save"
                onCancel={() => { setOpen(false); }}
                destroyOnClose
                keyboard={false}
                maskClosable={false}
                width={1200}
                className="app-modal-body"
            >
                <UserManagement userId={data.userId}/>
            </Modal>
        </>
    );
});