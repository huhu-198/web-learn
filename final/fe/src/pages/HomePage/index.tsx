import { UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, message, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './style.css';
import axios from 'axios';

const { Header, Sider } = Layout;

const HomePage = () => {
	const navigate = useNavigate();
	const [isLoginState, setIsLoginState] = useState('用户名');
	const [userPhoto, setUserPhoto] = useState('');

	const handleLogout = () => {
		axios
			.post('/api/user/logout')
			.then((res) => {
				console.log(res.data);
				if (res.data.code === 0) {
					console.log('退出登录成功');
					setIsLoginState('');
					setUserPhoto('');
				}
			})
			.catch((err) => {
				console.log('错误' + err);
			});
	};

	const imgLogoutClick = (
		<Button className="imgLogoutClick" onClick={handleLogout}>
			退出登录
		</Button>
	);
	useEffect(() => {
		if (!isLoginState) {
			navigate('/login');
			console.log('当前未登录，跳转到登录页');
			console.log(isLoginState);
		}
	}, [isLoginState]);

	useEffect(() => {
		axios
			.get('/api/user/info')
			.then((res) => {
				console.log(res.data);
				if (res.data.code === -2) {
					console.log('当前未登录');
					message.info('当前未登录，请登录后继续访问');
					setIsLoginState('');
					setUserPhoto('');
				}
				if (res.data.code === 0) {
					console.log('当前已登录');
					setIsLoginState(res.data.user);
					setUserPhoto(res.data.photo);
				}
			})
			.catch((err) => {
				console.log('错误' + err);
			});
	}, []);
	return (
		<Layout className="homePageMainLayout">
			<Header className="header">
				<Link to="/homepage">
					<h1 className="headerTitle">人物管理系统</h1>
				</Link>
				<div className="userMsg">
					<div className="userName">{isLoginState}</div>
					<Popover content={imgLogoutClick} trigger="click">
						<img src={userPhoto} className="userImg" />
					</Popover>
				</div>
			</Header>
			<Layout>
				<Sider breakpoint="lg" collapsedWidth="0">
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['1']}
						items={[UserOutlined].map((icon, index) => ({
							key: String(index + 1),
							icon: React.createElement(icon),
							label: `人物管理`,
						}))}
					/>
				</Sider>
				<Outlet />
			</Layout>
		</Layout>
	);
};

export default HomePage;
