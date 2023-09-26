import { Avatar, Layout, Menu, Image } from "antd";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import commonObj from "../../commonObj";


export default function Top() {

    const items = [
        {
            label: commonObj?.name ? commonObj.name : 'You',
            icon: <Avatar shape="circle" size={32}
                src={
                    commonObj?.avatar?.url
                        ?
                        <Image
                            src={commonObj?.avatar.url}
                            style={{
                                width: 32,
                            }}
                            preview={false}
                        />
                        : null
                }
                icon={!commonObj?.avatar?.url ? <UserOutlined /> : null}
            />,
            key: 'profile',
        },
        {
            label: 'Logout',
            icon: <LogoutOutlined />,
            key: 'logout',
            style: { color: 'red' },
            onClick: () => { window.localStorage.clear(); window.location.reload(); }
        },
    ];

    return (
        <>
            <Layout.Header style={{ padding: 0, height: 'auto' }} >
                <Menu mode="horizontal" items={items} style={{ lineHeight: '46px' }} />
            </Layout.Header>
        </>
    );

}