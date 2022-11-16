import { Layout } from 'antd';
import LoginBox from '../../components/LoginBox';

import './style.css';

const { Header } = Layout;

const Login = () => {
	return (
		<Layout>
			<Header className="header">
				<h1 className="headerTitle">人物管理系统</h1>
			</Header>
			<Layout
				style={{
					alignItems: 'center',
					background: '#fff',
				}}>
				<LoginBox />
			</Layout>
		</Layout>
	);
};
export default Login;
