import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './style.css';

const LoginBox: React.FC = () => {
	const navigate = useNavigate();

	// 提交失败的异常情况
	const onFinishFailed = (
		errorInfo: ValidateErrorEntity<{ username: string; password: string }>
	) => {
		console.log('Failed:', errorInfo);
		message.error('登录失败');
	};
	// 登录状态
	const [isLoginState, setIsLoginState] = useState('');
	useEffect(() => {
		if (isLoginState) {
			navigate('/homepage');
			console.log('登录成功，即将跳转主页');
			message.success('登录成功，跳转至主页');
			console.log(isLoginState);
		}
		// eslint-disable-next-line
	}, [isLoginState]);

	// 首次渲染时检查登录状态
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

	// 提交登录表单
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
