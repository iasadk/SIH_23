import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SiteLoader from './views/components/SiteLoader';
import { AntdMsg } from './utils/Antd';
import './notification';
import commonObj from './commonObj';
import service from '../src/services/admin'
import { ConfigProvider, Button, theme, Dropdown, Menu } from 'antd';


const LayoutAdmin = React.lazy(() => import('./views/layout/Layout'));
const Login = React.lazy(() => import('./views/pages/Login'));

function App() {
	const [isLoggedin, setIsLoggedin] = useState(true);
	const [ajxRequesting, setAjxRequesting] = useState(false);

	const [apptheme, setAppTheme] = useState(window.localStorage.getItem('theme'))

	useEffect(() => {
		setAjxRequesting(true);

		service.validateToken().then(res => {
			setIsLoggedin(true);
			commonObj.userType = res.data.type;
			commonObj.modules = res.data.modules;
			commonObj.name = res.data.name;
			commonObj.avatar = res.data.avatar;
			AntdMsg(res.message);
		}).catch(err => {
			console.log(err)
			if (err.message) {
				setIsLoggedin(false);
				window.localStorage.clear();
				AntdMsg('Unauthorized. Login Again!!', 'error');
			}
		}).finally(() => {
			setAjxRequesting(false);
		});
	}, []);


	useEffect(() => {
		window.localStorage.setItem('theme', apptheme);
	}, [apptheme])

	return (
		<>
			<ConfigProvider
				theme={{
					algorithm: apptheme === 'dark' ? theme.darkAlgorithm : apptheme === 'compact' ? theme.compactAlgorithm : theme.defaultAlgorithm,
					token: {
						colorPrimary: "#0c75de",
						borderRadius: '0px'
					}
				}}
			>
				<BrowserRouter basename="/">
					{
						!ajxRequesting
							? isLoggedin
								? <Suspense fallback={<SiteLoader />}><LayoutAdmin /></Suspense>
								: <Suspense fallback={<SiteLoader />}><Login /></Suspense>
							: <SiteLoader />
					}

				</BrowserRouter >
				{/* <div style={{ position: 'fixed', right: 20, bottom: 50 }}>
					<Dropdown overlay={<Menu
						onClick={(e) => {
							setAppTheme(e.key)

						}}
						items={[{ key: 'light', label: 'Light' }, { key: 'dark', label: 'Dark' }, { key: 'compact', label: 'Compact' }
						]} />}
						placement="top"
					>
						<Button>Theme</Button>
					</Dropdown>
				</div> */}
			</ConfigProvider>
		</>
	);
}

export default App;
