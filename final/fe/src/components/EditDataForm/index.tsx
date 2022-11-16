import {
	Form,
	Input,
	Modal,
	Select,
} from 'antd';
import React from 'react';

interface EditDataFormType {
	id: string;
	name: string;
	project: string;
	grade: string;
	sex: number;
	phone: string;
	email: string;
	photo: string;
}

interface CollectionCreateFormProps {
	open: boolean;
	onCreate: (values: EditDataFormType) => void;
	onCancel: () => void;
	editStuData: any;
}

const EditDataForm: React.FC<CollectionCreateFormProps> = ({
	open,
	onCreate,
	onCancel,
	editStuData,
}) => {
	const [form] = Form.useForm();
	console.log('读取数据', editStuData);

	// 使用setFieldsValue每次都更新表单的值
	form.setFieldsValue({
		id: editStuData.id,
		name: editStuData.name,
		project: editStuData.project,
		grade: editStuData.grade,
		sex: Number(editStuData.sex),
		phone: editStuData.phone,
		email: editStuData.email,
		photo: editStuData.photo,
	});

	return (
		<Modal
			title="编辑用户"
			open={open}
			centered
			okText="确认"
			cancelText="取消"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values: EditDataFormType) => {
						form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log('Validate Failed:', info);
					});
			}}
			width={700}>
			<Form
				form={form}
				name="EditDataForm"
				className="EditDataForm"
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"

				initialValues={editStuData}
				size="middle">
				{/* 隐藏id字段 */}
				<Form.Item name="id" className="idFormItem" hidden={true}></Form.Item>
				<Form.Item
					label="姓名"
					name="name"
					rules={[{ required: true, message: 'Please input name!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="专业"
					name="project"
					rules={[{ required: true, message: 'Please input project!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="年级"
					name="grade"
					rules={[{ required: true, message: 'Please select grade!' }]}>
					<Select>
						<Select.Option value="2018级">2018级</Select.Option>
						<Select.Option value="2019级">2019级</Select.Option>
						<Select.Option value="2020级">2020级</Select.Option>
						<Select.Option value="2021级">2021级</Select.Option>
						<Select.Option value="2022级">2022级</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					label="性别"
					name="sex"
					rules={[{ required: true, message: 'Please select sex!' }]}>
					<Select>
						<Select.Option value={0}>男</Select.Option>
						<Select.Option value={1}>女</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					label="电话"
					name="phone"
					rules={[{ required: true, message: 'Please input phone!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="邮箱"
					name="email"
					rules={[{ required: true, message: 'Please input email!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="头像"
					name="photo"
					rules={[{ required: true, message: 'Please input photo address!' }]}>
					<Input placeholder="默认头像地址：/stuphoto.png" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EditDataForm;
