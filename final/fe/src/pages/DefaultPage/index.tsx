import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

// 当地址为空时，由中转页跳转至主页
const DefaultPage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/homepage');
		console.log('跳转到首页');
	}, []);

	return <></>;
};
export default DefaultPage;
