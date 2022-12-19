import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, message, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './style.css';
import axios from 'axios';
import { postLogout } from '../../api';

const { Header, Sider } = Layout;

const HomePage = () => {
	const navigate = useNavigate();

	const [isLoginState, setIsLoginState] = useState('用户名');
	const [userPhoto, setUserPhoto] = useState('');

	const handleLogout = () => {
		postLogout()
			.then((res: any) => {
				console.log(res.data);
				if (res.data.code === 0) {
					console.log('退出登录成功');
					setIsLoginState('');
					setUserPhoto('');
				}
			})
			.catch((err: any) => {
				console.log('错误' + err);
			});
	};

	useEffect(() => {
		if (!isLoginState) {
			navigate('/login');
			console.log('当前未登录，跳转到登录页');
			console.log(isLoginState);
		}
		// eslint-disable-next-line
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

	const imgLogoutClick = (
		<Button className="imgLogoutClick" onClick={handleLogout}>
			退出登录
		</Button>
	);

	return (
		<Layout className="homePageMainLayout">
			<Header className="header">
				<Link to="/homepage">
					<h1 className="headerTitle">人员管理系统</h1>
				</Link>
				<div className="userMsg">
					<div className="userName">{isLoginState}</div>
					<Popover content={imgLogoutClick} trigger="click">
						<img src={userPhoto} className="userImg" alt="user" />
					</Popover>
				</div>
			</Header>
			<Layout>
				<Sider breakpoint="lg" collapsedWidth="0">
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['/homepage']}
						items={[
							{
								key: '/homepage',
								icon: React.createElement(UserOutlined),
								label: <Link to="/homepage">人员管理</Link>,
							},
							{
								key: '/homepage/about',
								icon: React.createElement(SmileOutlined),
								label: <Link to="/homepage/about">关于</Link>,
							},
						]}
					/>
				</Sider>
				<Outlet />
			</Layout>
		</Layout>
	);
};

export default HomePage;
