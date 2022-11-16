import { Layout, Input, Button, message } from 'antd';
import DataList from '../DataTable';
import React, { useState } from 'react';
import AddDataForm from '../AddDataForm';

import './style.css';
import axios from 'axios';

const { Content } = Layout;
const { Search } = Input;

interface TableParams {
	pagination: any;
}

const ListContainer: React.FC = () => {
	// 信息列表
	const [stuListData, setStuListData] = useState([]);

	// 每次对列表操作，需要重新请求列表
	const [tableOps, setTableOps] = useState(0);

	// 搜索字符串
	const [searchString, setSearchString] = useState('');

	// 表格状态 当前所在的页数和每页信息条数
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 5,
		},
	});

	// 搜索操作
	const onSearch = (value: string) => {
		let inputSearchValue = value.trim();
		setSearchString(inputSearchValue);
		console.log('搜索内容为：', inputSearchValue);
		resetStuDataList();
	};

	// 重置搜索
	const resetSearch = () => {
		setSearchString('');
		onSearch('');
	};

	// 添加人员表单的打开和关闭
	const [openAddDataBox, setOpenAddDataBox] = useState(false);
	const onCreate = (values: any) => {
		console.log('提交的添加人员表单数据为', values);
		axios
			.post('/api/stu/create', {
				photo: '/stuphoto.png',
				name: values.name,
				project: values.project,
				grade: values.grade,
				sex: String(values.sex),
				phone: values.phone,
				email: values.email,
			})
			.then((res) => {
				if (res.data.code === 0) {
					console.log('创建成功');
					setOpenAddDataBox(false);
					message.success('创建成功！');
					setTableOps(tableOps + 1);
				}
				console.log('返回结果', res.data);
			})
			.catch((err) => {
				console.log('错误' + err);
			});
	};

	// 完成搜索操作后，重置所在页码，重新请求列表
	const resetStuDataList = () => {
		setTableOps(tableOps + 1);
		setTableParams({
			pagination: {
				current: 1,
				pageSize: 5,
			},
		});
	};

	return (
		<>
			<Layout style={{ padding: '0 24px 24px' }}>
				<Layout className="filterButton">
					<Button
						type="primary"
						className="addPeopleInput"
						onClick={() => setOpenAddDataBox(true)}>
						添加用户
					</Button>
					<Search
						placeholder="姓名"
						allowClear
						enterButton="搜索"
						size="large"
						onSearch={onSearch}
						className="searchInput input"
						value={searchString}
						onChange={(e) => {
							setSearchString(e.target.value);
						}}
					/>
					<Button className="resetInput" onClick={resetSearch}>
						重置搜索
					</Button>
				</Layout>

				<Content
					className="site-layout-background"
					style={{
						padding: 24,
						margin: 0,
						minHeight: 500,
						minWidth: 1050,
					}}>
					<DataList
						stuListData={stuListData}
						setStuListData={setStuListData}
						tableOps={tableOps}
						setTableOps={setTableOps}
						searchString={searchString}
						tableParams={tableParams}
						setTableParams={setTableParams}
					/>
				</Content>
			</Layout>

			<AddDataForm
				open={openAddDataBox}
				onCreate={onCreate}
				onCancel={() => {
					setOpenAddDataBox(false);
				}}></AddDataForm>
		</>
	);
};

export default ListContainer;
