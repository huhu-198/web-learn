import Koa from 'koa';
import server from 'koa-static';
import Router from 'koa-router';
import koaBody from 'koa-body';
import { v4 as uuidv4 } from 'uuid';
import session from 'koa-session';

const router = new Router();

const app = new Koa();
const CONFIG = {
	key: 'koa.sess',
	maxAge: 86400000,
	autoCommit: true,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: false,
	renew: false,
	secure: false,
	sameSite: null,
};
app.keys = ['hust web', 'huhuan'];

app.use(
	koaBody({
		multipart: true,
	})
);
app.use(session(CONFIG, app));

// 静态资源处理
app.use(server('./static'));

// 人员信息列表
let stuDataList = [];
let stuDataPageList = [];

// 创建原数组
const createStuList = (totalNum) => {
	for (let i = 0; i < totalNum; i += 1) {
		stuDataList.push({
			// id: i,
			id: uuidv4(),
			photo: '/stuphoto.png',
			name: `Edrward ${i}`,
			project: '计算机',
			grade: '2020级',
			// 男生0，女生1
			sex: i % 2,
			phone: '1999999',
			email: '19999999@qq.com',
		});
	}
};
createStuList(11);

// 分割数组
function sliceArr(arr, N) {
	const result = [];
	for (let i = 0; i < arr.length; i += N) {
		result.push(arr.slice(i, i + N));
	}
	return result;
}
stuDataPageList = sliceArr(stuDataList, 5);

// 检验是否登录 -后端检验
async function getUserInfo(ctx, next) {
	console.log(ctx.session.name);
	if (!ctx.session.name) {
		ctx.body = { code: -2, message: '当前未登录' };
		return;
	}
	await next();
}

// 检验当前登录信息 -前端可调用的api接口
async function userInfo(ctx) {
	const userName = ctx.session.name;
	if (!ctx.session.name) {
		ctx.body = { code: -2, message: '当前未登录' };
		return;
	}
	ctx.body = {
		code: 0,
		message: '当前已登录',
		user: userName,
		photo: '/user.png',
	};
}

// 获取人员信息分页列表 若包含search参数则进行搜索
async function getUserList(ctx) {
	console.log('query', ctx.query);
	// 如果没有page，默认为 1
	const page = Number(ctx.query.page) || 1;
	console.log('获取搜索结果第', page, '页信息');
	const searchString = ctx.query.search || '';

	let searchStuDataList = [...stuDataList];
	let searchStuDataPageList = sliceArr(searchStuDataList, 5);

	// 如果搜索结果不为空
	if (searchString.length > 0) {
		searchStuDataList = stuDataList.filter(
			(item) => item.name.search(searchString) !== -1
		);
		searchStuDataPageList = sliceArr(searchStuDataList, 5);
	}

	// 异常数据检测
	if (page > 0 && page <= searchStuDataPageList.length) {
		ctx.body = {
			code: 0,
			total: searchStuDataList.length,
			list: searchStuDataPageList[page - 1],
		};
	} else if (page <= 0) {
		ctx.body = {
			code: -1,
			total: searchStuDataList.length,
			msg: 'page不允许小于1',
		};
	} else {
		ctx.body = {
			code: -2,
			total: searchStuDataList.length,
			msg: 'page不允许大于最大页数',
		};
	}
}

// 登录验证
async function checkLoginUser(ctx) {
	console.log('收到登录请求', ctx.request.body);
	const { user, pwd } = ctx.request.body;
	// 账号密码验证逻辑，先预设为true
	let isCorrect = true;
	// 验证账号和密码,写死用户名和密码
	if (user === 'huhuan' && pwd === '1234') {
		isCorrect = true;
	} else {
		isCorrect = false;
	}
	// console.log('验证结果', isCorrect);
	if (isCorrect) {
		// 写入 koa-session
		console.log('当前koa-session', ctx.session);
		const LoginUserName = user;
		ctx.session.name = LoginUserName;
		console.log('写入后koa-session', ctx.session);

		ctx.body = { code: 0, message: '登录成功' };
	} else {
		ctx.body = { code: -1, message: '账号不存在或密码错误' };
	}
}

// 退出登录
async function logoutUser(ctx) {
	if (!ctx.session.name) {
		ctx.body = { code: -2, message: '当前未登录' };
		return;
	}
	ctx.session.name = null;
	ctx.body = { code: 0, message: '退出登录成功' };
}

// 创建人员
async function createUser(ctx) {
	if (
		// 判断参数是否齐全
		ctx.request.body.photo &&
		ctx.request.body.name &&
		ctx.request.body.project &&
		ctx.request.body.sex &&
		ctx.request.body.grade &&
		ctx.request.body.phone &&
		ctx.request.body.email
	) {
		const { name, project, grade, sex, phone, email } = ctx.request.body;
		// 要判断是否缺少参数
		const newStu = {
			id: uuidv4(),
			photo: '/stuphoto.png',
			name,
			project,
			grade,
			// 男生0，女生1
			sex,
			phone,
			email,
		};
		stuDataList.push(newStu);
		stuDataPageList = sliceArr(stuDataList, 5);

		// 回包到浏览器
		ctx.body = { code: 0, message: '创建人员成功' };
	} else {
		ctx.body = { code: -1, message: '人员参数类型缺少或错误' };
	}
}

// 更新记录
async function updateUser(ctx) {
	console.log(ctx.request.body);
	if (
		// 判断参数是否齐全
		ctx.request.body.id &&
		ctx.request.body.photo &&
		ctx.request.body.name &&
		ctx.request.body.project &&
		ctx.request.body.sex &&
		ctx.request.body.phone &&
		ctx.request.body.email
	) {
		const { id, name, project, grade, sex, phone, email } = ctx.request.body;
		// 要判断是否缺少参数
		const updateStuItem = {
			id,
			photo: '/stuphoto.png',
			name,
			project,
			grade,
			sex,
			phone,
			email,
		};

		const newStuList = stuDataList.map((item) => {
			if (item.id === id) return updateStuItem;
			return item;
		});
		stuDataList = newStuList;
		stuDataPageList = sliceArr(stuDataList, 5);
		// 回包到浏览器
		ctx.body = { code: 0, message: '更新人员信息成功' };
	} else {
		ctx.body = { code: -1, message: '人员参数类型缺少或错误' };
	}
}

// 删除记录
async function deleteUser(ctx) {
	if (
		// 判断传入参数是否齐全
		ctx.request.body.id
	) {
		const { id } = ctx.request.body;
		// 检查删除的目标id是否合法
		let isExist = false;
		stuDataList.map((item) => {
			if (item.id === id) {
				isExist = true;
			}
			return true;
		});
		if (isExist) {
			const newStuList = stuDataList.filter((item) => item.id !== id);
			stuDataList = newStuList;
			stuDataPageList = sliceArr(stuDataList, 5);
			ctx.body = { code: 0, message: '删除人员信息成功' };
		} else {
			ctx.body = { code: -1, message: '人员key类型缺少或错误' };
		}
	}
}

// 登录
router.post('/api/user/login', checkLoginUser);
// 退出登录
router.post('/api/user/logout', logoutUser);
// 是否存在用户信息
router.get('/api/user/info', userInfo);

// 获取全部人员信息列表
router.get('/api/stu/list', getUserInfo, getUserList);

// 创建人员信息
router.post('/api/stu/create', getUserInfo, createUser);

// 更新记录
router.post('/api/stu/update', getUserInfo, updateUser);

// 删除记录
router.post('/api/stu/delete', getUserInfo, deleteUser);

// 启动路由
app.use(router.routes()).use(router.allowedMethods());

// 窗口监听
app.listen(3501, () => {
	console.log('=== 3501 端口监听启动');
});
