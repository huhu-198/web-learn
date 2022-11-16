import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

import './style.css';

const { Content } = Layout;

const Detail: React.FC = () => {
	// state参数接收，列表中传递的人员详细信息
	const parmas = useLocation();
	const parmasData = parmas.state;

	return (
		<Content style={{ padding: '0 50px' }}>
			<Breadcrumb style={{ margin: '16px 0' }}>
				<Breadcrumb.Item href="/#/homepage">人员管理</Breadcrumb.Item>
				<Breadcrumb.Item>查看详情</Breadcrumb.Item>
			</Breadcrumb>

			<div className="site-layout-content">
				<div className="detailDataItem">
					<span>头像: </span>
					<img
						src={parmasData.photo}
						className="detailPeosenPhoto"
						alt="detail"
					/>
				</div>
				<div className="detailDataItem">
					<span>姓名: </span>
					{parmasData.name}
				</div>
				<div className="detailDataItem">
					<span>专业: </span>
					{parmasData.project}
				</div>
				<div className="detailDataItem">
					<span>年级: </span>
					{parmasData.grade}
				</div>
				<div className="detailDataItem">
					<span>性别: </span>
					{parmasData.sex ? 'male' : 'female'}
				</div>
				<div className="detailDataItem">
					<span>电话: </span>
					{parmasData.phone}
				</div>
				<div className="detailDataItem">
					<span>邮箱: </span>
					{parmasData.email}
				</div>
			</div>
		</Content>
	);
};

export default Detail;
