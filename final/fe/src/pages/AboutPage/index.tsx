import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import './style.css';

// 关于页面
const AboutPage = () => {
	return (
		<Layout style={{ padding: '25px 24px 24px' }}>
			<Content
				style={{
					padding: 24,
					margin: 0,
					minHeight: 500,
					minWidth: 1050,
				}}>
				<div className="site-layout-content">
					<div className="aboutContainer">
						<h2>设计总结</h2>
						<p>完成了人员管理系统的功能，实现了前后端分离</p>
						<p>
							<span>前端部分</span>
						</p>
						<p>
							使用React、Typescript和antd，使用了router路由、axios请求、react
							hooks等技术，通过TS定义接口提高程序的健壮性
						</p>
						<p>
							对各模块进行拆分，如在添加人员、删除人员、修改人员信息时动态渲染人员列表,
							提高了程序运行效率
						</p>
						<p>
							在首页等页面会通过后端请求验证是否登录，若未登录则跳转至登录页；
							登录页会检查登录信息，若已登录则自动跳转至首页
						</p>
						<p>
							对边际情况进行了处理，如删除最后一页所有人员后该页无信息，自动跳转到上一页,
							并更新页码
						</p>
						<p>对用户输入进行了限制，需要用户填写必选项后方可提交表单</p>

						<p>
							<span>后端部分</span>
						</p>
						<p>
							使用koa实现登录、退出登录、获取人员列表、创建人员列表、修改信息等7个api接口，
							如获取人员列表等api接口可以同时实现根据query参数搜索功能
						</p>
						<p>
							对前端传的参数进行了检查，缺失参数或参数异常（如page过大或过小），等情况，
							会返回报错信息提示前端
						</p>
						<p>
							在接受查询人员列表、修改人员信息等请求后会先根据前端请求的session信息验证登录身份，
							验证成功后方可执行
						</p>
					</div>
				</div>
			</Content>
		</Layout>
	);
};
export default AboutPage;
