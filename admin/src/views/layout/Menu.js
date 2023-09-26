import { Menu } from 'antd';
import React from 'react';
import routes from './route';
import { Link, useLocation } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';


const items = [...routes];
function convertMultiToSingle(arr, prevBaseUrl = '') {
    arr.forEach((v, i) => {
        if (v.children?.length) {
            arr[i] = {
                ...arr[i],
                key: prevBaseUrl + v.url,
                icon: <v.icon />,
                label: <Link className="text-d-none" to={(prevBaseUrl + v.url)}>{v.title}</Link>
            }
            convertMultiToSingle(v.children, prevBaseUrl + v.url);
        } else {
            arr[i] = {
                ...v,
                key: prevBaseUrl + v.url,
                icon: <v.icon />,
                label: <Link className="text-d-none" to={(prevBaseUrl + v.url)}>{v.title}</Link>
            }
        }
    })
}
convertMultiToSingle(items);

items.push(
    {
        label: 'Logout',
        icon: <LogoutOutlined />,
        key: 'logout',
        style: { color: 'red' },
        onClick: () => { window.localStorage.clear(); window.location.reload(); },
        component: <></>
    }
);

const App = () => {
    const paths = [];
    useLocation().pathname.split('/')?.reduce((prev, cur) => {
        paths.push(prev + '/' + cur);
        return prev + '/' + cur;
    });

    return (
        <>
            {
                <Menu
                    defaultSelectedKeys={[paths.pop()]}
                    defaultOpenKeys={[...paths]}
                    mode="horizontal"
                    theme="dark"
                    items={items}
                />
            }
        </>
    );
};

export default App;