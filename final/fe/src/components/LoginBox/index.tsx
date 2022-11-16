import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

const LoginBox: React.FC = () => {
	const navigate = useNavigate();
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
		message.error('账号不存在或密码错误');
	};
	const [isLoginState, setIsLoginState] = useState('');
	useEffect(() => {
		if (isLoginState) {
			navigate('/homepage');
			console.log('登录成功，即将跳转主页');
			message.success('登录成功，跳转至主页');
			console.log(isLoginState);
		}
	}, [isLoginState]);

	useEffect(() => {
		axios
			.get('/api/user/info')
			.then((res) => {
				console.log(res.data);
				if (res.data.code === 0) {
					console.log('自动登录成功');
					setIsLoginState(res.data.user);
				}
			})
			.catch((err) => {
				console.log('错误' + err);
			});
	}, []);

	const onFinish = (values: { username: string; password: string }) => {
		axios
			.post('/api/user/login', {
				user: values.username,
				pwd: values.password,
			})
			.then((res) => {
				console.log(res.data);
				if (res.data.code === 0) {
					console.log('账号密码验证成功');
					setIsLoginState(values.username);
				} else {
					message.error('账号不存在或密码错误');
					message.info('测试账号：用户名 huhuan；密码 1234');
				}
			})
			.catch((err) => {
				console.log('错误' + err);
			});
	};

	return (
		<div className="LoginBox">
			<h2 className="LoginHeader">登录</h2>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off">
				<Form.Item
					label="用户名"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="密码"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						登录
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginBox;
