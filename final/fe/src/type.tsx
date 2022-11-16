// 人员信息数据接口 包括id
export interface DataType {
	id: string;
	photo: string;
	name: string;
	project: string;
	grade: string;
	sex: number;
	phone: string;
	email: string;
}

// 添加人员信息数据接口 无id
export interface addDataFormType {
	name: string;
	project: string;
	grade: string;
	sex: string;
	phone: string;
	email: string;
	photo: string;
}

// 页码信息接口
export interface TableParams {
	pagination: {
		current: number;
		pageSize: number;
	};
}
