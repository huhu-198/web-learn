import axios from 'axios';

// 获取人员列表
export const postLogout = () => {
	return axios.post('/api/user/logout');
};
