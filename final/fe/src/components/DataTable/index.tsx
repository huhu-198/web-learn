import {
	Button,
	message,
	Modal,
	Popover,
	Table,
	TablePaginationConfig,
	Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { ExclamationCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

import EditDataForm from '../EditDataForm';
import './style.css';
import { DataType, TableParams } from '../../type';

const { confirm } = Modal;

// 页码信息接口

const DataTable = (props: {
	stuListData: any;
	setStuListData: Function;
	tableOps: number;
	setTableOps: Function;
	searchString: string;
	tableParams: TableParams;
	setTableParams: Function;
}) => {
	// 表格数据类型
	const columns: ColumnsType<DataType> = [
		{
			title: '头像',
			dataIndex: 'photo',
			key: 'photo',
			render: (photoSrc) => {
				return <img src={photoSrc} className="PeosenPhoto" alt="student" />;
			},
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '专业',
			dataIndex: 'project',
			key: 'project',
		},
		{
			title: '年级',
			dataIndex: 'grade',
			key: 'grade',
		},
		{
			title: '性别',
			key: 'sex',
			dataIndex: 'sex',
			render: (_, { sex }) => {
				if (Number(sex) === 0) {
					return <Tag color="geekblue">男</Tag>;
				}
				return <Tag color="green">女</Tag>;
			},
		},
		{
			title: '电话',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: '设置',
			dataIndex: 'key',
			key: 'setOps',
			render: (_text, record, _index) => {
				return (
					<Popover
						placement="bottom"
						content={opsHoverButtonContent(record)}
						trigger="hover">
						<Button className="opsHoverButtonContent">
							<SettingOutlined />
						</Button>
					</Popover>
				);
			},
		},
	];

	// 改变表格
	const handleTableChange = (pagination: TablePaginationConfig) => {
		props.setTableParams({
			pagination,
		});
	};
	// 删除记录操作
	const showDeleteConfirm = (stuData: DataType) => {
		confirm({
			title: '提示',
			icon: <ExclamationCircleOutlined />,
			content: `确定要删除用户 “${stuData.name}” 吗？`,
			okText: '确定',
			cancelText: '取消',
			onOk() {
				axios
					.post('/api/stu/delete', { id: stuData.id })
					.then((res) => {
						console.log(res.data);
						if (res.data.code === 0) {
							console.log('删除成功');
							message.success('删除成功');
							props.setTableOps(props.tableOps + 1);
							console.log(
								'最大页码',
								Math.ceil((props.stuListData.total - 1) / 5)
							);
							console.log('当前页码', props.tableParams.pagination.current);

							// 如果删除最后一页所有信息后，当前页码超过最大页码时，当前所在的页码需要更新
							const maxPage = Math.ceil((props.stuListData.total - 1) / 5);
							if (props.tableParams.pagination.current >= maxPage) {
								props.setTableParams({
									pagination: {
										current: maxPage,
										pageSize: 5,
									},
								});
							}
						} else {
							console.log('删除失败');
							message.info('删除失败');
						}
					})
					.catch((err) => {
						console.log('错误' + err);
					});
			},
			onCancel() {
				console.log('取消删除操作');
				message.success('取消删除成功');
			},
		});
	};
	// 对记录进行操作
	const opsHoverButtonContent = (_record: DataType) => {
		return (
			<div className="opsHoverButtonCantainer">
				<Button className="opsHoverButton">
					<Link to={'/homepage/detail'} state={_record}>
						查看
					</Link>
				</Button>
				<Button
					className="opsHoverButton"
					onClick={() => {
						setOpenEditDataBox(true);
						setEditStuData(_record);
					}}>
					编辑
				</Button>
				<Button
					onClick={() => showDeleteConfirm(_record)}
					type="dashed"
					style={{ border: 0 }}>
					删除
				</Button>
			</div>
		);
	};
	/* 列表翻页时、进行修改和添加信息操作后，重新请求新分页
	   通过useEffect依赖页码的变化和操作情况的变化，实现动态请求
	   要处理最后一页数据被全部删除后的情况，改变当前所在的页数
	   请求分页信息包含search参数，如果search为空则返回全部信息 */
	useEffect(() => {
		axios
			.get(
				`/api/stu/list?search=${props.searchString}&page=${props.tableParams.pagination.current}`
			)
			.then((res) => {
				if (res.data.code === 0) {
					const newStuData = res.data;
					props.setStuListData(newStuData);
				} else if (res.data.code === -2) {
					//当前所在页的数据被全部删除，需要跳转页码
					console.log(res.data);
				}
			})
			.catch((err) => {
				console.log('错误' + err);
			});
		// eslint-disable-next-line
	}, [props.tableParams, props.tableOps]);

	// 编辑人员信息表单的打开和关闭
	const [openEditDataBox, setOpenEditDataBox] = useState(false);
	const [editStuData, setEditStuData] = useState<DataType>({
		id: '1',
		photo: '',
		name: '',
		project: '',
		grade: '',
		sex: 0,
		phone: '',
		email: '',
	});

	const onCreate = (values: DataType) => {
		// 表单中因为没有id，可能丢失传入的key，需要在表单中添加id项并隐藏
		axios
			.post('/api/stu/update', {
				id: values.id,
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
					setOpenEditDataBox(false);
					message.success('修改成功！');
					// 修改成功后，重新请求列表
					props.setTableOps(props.tableOps + 1);
				}
				console.log(res.data);
			})
			.catch((err) => {
				console.log('错误' + err);
			});
	};

	return (
		<>
			<Table
				rowKey="id"
				columns={columns}
				dataSource={props.stuListData.list}
				pagination={{
					showSizeChanger: false,
					current: props.tableParams.pagination.current,
					defaultCurrent: 1,
					defaultPageSize: 5,
					total: props.stuListData.total,
				}}
				style={{ minWidth: '1000px' }}
				onChange={handleTableChange}
			/>
			<EditDataForm
				open={openEditDataBox}
				onCreate={onCreate}
				onCancel={() => {
					setOpenEditDataBox(false);
				}}
				editStuData={editStuData}></EditDataForm>
		</>
	);
};

export default DataTable;
