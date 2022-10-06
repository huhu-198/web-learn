// 展开列表数据
let navOnclickContainerListData = [
	{
		name: 'Inspiration',
	},
	{
		name: 'Find Work',
	},
	{
		name: 'Learn Design',
	},
	{
		name: 'Go pro',
	},
	{
		name: 'Hire Designers',
	},
];

const body = document.querySelector('body');

const header = document.createElement('header');
const wrap = document.createElement('div');
const footer = document.createElement('footer');
wrap.classList.add('wrap');

body.appendChild(header);
body.appendChild(wrap);
body.appendChild(footer);

//创建顶部导航栏
const NavContainer = document.createElement('nav');
NavContainer.classList.add('NavContainer');
header.appendChild(NavContainer);

//菜单和关闭按钮切换
const navIconContainer = document.createElement('div');
navIconContainer.classList.add('IconContainer');
navIconContainer.classList.add('navIconContainer');

//顶部的展开;
const navOnclickContainer = document.createElement('nav');
navOnclickContainer.id = 'navOnclickContainer';
navOnclickContainer.classList.add('navOnclickContainer');
navOnclickContainer.classList.add('hidden');
body.appendChild(navOnclickContainer);

navIconContainer.addEventListener('click', (e) => {
	const OnclickBackground = document.querySelector('#navOnclickContainer');
	if (OnclickBackground.classList.contains('hidden')) {
		OnclickBackground.classList.remove('hidden');
	} else {
		OnclickBackground.classList.add('hidden');
	}
	for (let elem of navIconContainer.childNodes) {
		if (elem.classList.contains('hidden')) {
			elem.classList.remove('hidden');
		} else {
			elem.classList.add('hidden');
		}
	}
});

NavContainer.appendChild(navIconContainer);

//Menu
const navIconMenuContainer = document.createElement('div');
navIconMenuContainer.classList.add('IconContainer');
navIconMenuContainer.classList.add('menu');
navIconContainer.appendChild(navIconMenuContainer);

const navIconMenu = document.createElement('img');
navIconMenu.classList.add('navElement');
navIconMenu.classList.add('menuImg');
navIconMenu.src = 'imgs/icon-menu.svg';
navIconMenu.width = '18';
navIconMenuContainer.appendChild(navIconMenu);

//关闭展开菜单
const navIconCloseContainer = document.createElement('div');
navIconCloseContainer.classList.add('IconContainer');
navIconCloseContainer.classList.add('close');
navIconCloseContainer.classList.add('hidden');
navIconContainer.appendChild(navIconCloseContainer);

const navIconClose = document.createElement('img');
navIconClose.classList.add('navElement');
navIconMenu.classList.add('closeImg');
navIconClose.src = 'imgs/icon-close.svg';
navIconClose.width = '24';
navIconCloseContainer.appendChild(navIconClose);

//nav Logo
const navIconLogoContainer = document.createElement('div');
navIconLogoContainer.classList.add('IconContainer');
NavContainer.appendChild(navIconLogoContainer);

const navIconLoge = document.createElement('img');
navIconLoge.classList.add('navElement');
navIconLoge.classList.add('Logo');
navIconLoge.src = 'imgs/logo-black.svg';
navIconLoge.width = '76';
navIconLogoContainer.appendChild(navIconLoge);

//nav Sign in
const navSignContainer = document.createElement('div');
navSignContainer.classList.add('IconContainer');
navSignContainer.classList.add('Signin');
NavContainer.appendChild(navSignContainer);

const navSign = document.createElement('a');
navSign.classList.add('navElement');
navSign.innerHTML = 'Sign in';
navSign.href = '#';
navSignContainer.appendChild(navSign);

//第一张大图
const SignUpContainer = document.createElement('div');
SignUpContainer.classList.add('SignUpContainer');
SignUpContainer.classList.add('imgContainer');
wrap.appendChild(SignUpContainer);

const SignUpImg = document.createElement('img');
SignUpImg.src = 'imgs/banner.webp';
SignUpImg.classList.add('img');
SignUpContainer.appendChild(SignUpImg);

const SignUpTextContainer = document.createElement('div');
SignUpTextContainer.classList.add('SignUpTextContainer');
SignUpContainer.appendChild(SignUpTextContainer);

const SignUpH1 = document.createElement('h1');
SignUpH1.innerHTML = "Discover the world's top designers & creatives";
SignUpH1.classList.add('SignUpH1');
SignUpTextContainer.appendChild(SignUpH1);

const SignUpText = document.createElement('p');
SignUpText.innerHTML =
	"Dribbble is the leading destination to fing & showcase creative work and home to the world's best design professionals.";
SignUpText.classList.add('SignUpText');
SignUpTextContainer.appendChild(SignUpText);

const SignUpButton = document.createElement('a');
SignUpButton.innerHTML = 'Sign up';
SignUpButton.classList.add('SignUpButton');
SignUpButton.classList.add('button');
SignUpTextContainer.appendChild(SignUpButton);

// 瀑布式大图
const mainContentList = document.createElement('ol');
mainContentList.classList.add('contentList');
wrap.appendChild(mainContentList);

//生成screenshot元素函数
let createScreenshotElement = (data) => {
	//console.log(data.cover);

	//生成screenshot一个元素
	const mainContentListElement = document.createElement('li');
	mainContentListElement.classList.add('mainContentListElement');
	mainContentList.appendChild(mainContentListElement);

	//插入图片容器
	const screenshotContainer = document.createElement('div');
	screenshotContainer.classList.add('screenshot');
	mainContentListElement.appendChild(screenshotContainer);

	//插入图片
	const screenshotImg = document.createElement('img');
	screenshotImg.src = data.cover;
	screenshotContainer.appendChild(screenshotImg);

	const screenshotInformation = document.createElement('div');
	screenshotInformation.classList.add('screenshotInformation');
	mainContentListElement.appendChild(screenshotInformation);

	//作者信息
	const userInformation = document.createElement('div');
	userInformation.classList.add('userInformation');
	screenshotInformation.appendChild(userInformation);

	const userInformationContenter = document.createElement('a');
	userInformationContenter.classList.add('user');
	userInformation.appendChild(userInformationContenter);

	const userInformationImg = document.createElement('img');
	userInformationImg.src = data.avatar;
	userInformationImg.classList.add('userInformationImg');
	const userInformationName = document.createElement('span');
	userInformationName.classList.add('userInformationName');
	userInformationName.innerHTML = data.name;

	userInformationContenter.appendChild(userInformationImg);
	userInformationContenter.appendChild(userInformationName);

	const userInformationbadge = document.createElement('a');
	userInformationbadge.innerHTML = '<span>' + data.badge + '</span>';
	userInformationbadge.href = 'javascript:;';
	userInformationbadge.classList.add('userInformationbadge');
	userInformation.appendChild(userInformationbadge);

	//生成点赞和浏览情况
	const statistics = document.createElement('div');
	statistics.classList.add('statistics');
	screenshotInformation.appendChild(statistics);

	let createStatistics = (d, type, typeUp) => {
		const statisticsDetial = document.createElement('div');
		statisticsDetial.classList.add('statistics' + typeUp);
		statistics.appendChild(statisticsDetial);

		const statisticsDetialimg = document.createElement('a');
		statisticsDetialimg.classList.add('statistics' + typeUp + 'img');
		statisticsDetial.appendChild(statisticsDetialimg);

		const Likeimg = document.createElement('img');
		Likeimg.classList.add(type + 'img');
		Likeimg.src = 'imgs/icon-' + type + '.svg';
		statisticsDetialimg.appendChild(Likeimg);

		const statisticsDetialNumber = document.createElement('span');
		statisticsDetialNumber.classList.add(type + 'Number');
		if (type == 'like') statisticsDetialNumber.innerHTML = d.likes;
		else if (type == 'view') statisticsDetialNumber.innerHTML = d.views;
		statisticsDetial.appendChild(statisticsDetialNumber);
	};
	createStatistics(data, 'like', 'Like');
	createStatistics(data, 'view', 'View');
};

//获取数据，生成图片列表
fetch('task.json')
	.then((response) => {
		console.log(response);
		return response.json();
	})
	.then((screenshotData) => {
		for (let e of screenshotData) {
			createScreenshotElement(e);
		}
	});

//底部footer
const footerContainer = document.createElement('div');
footerContainer.classList.add('footerContainer');
footer.appendChild(footerContainer);

const footerImgContainer = document.createElement('a');
footerImgContainer.classList.add('footerImgContainer');
footerContainer.appendChild(footerImgContainer);

const footerImg = document.createElement('img');
footerImg.src = 'imgs/logo-red.svg';
footerImg.classList.add('IconContainer');
footerImg.classList.add('footerImg');
footerImgContainer.appendChild(footerImg);

const footerText = document.createElement('p');
footerText.classList.add('footerText');
footerText.innerHTML =
	"Dribbble is the world's leading community for creatives to share, grow, and get hired.";
footerContainer.appendChild(footerText);

//顶部展开搜索页;
const navOnclickContainerList = document.createElement('ul');
navOnclickContainerList.classList.add('navOnclickContainerList');
navOnclickContainer.appendChild(navOnclickContainerList);

const createNavOnclickContainerList = (root, NavData) => {
	for (let elem of NavData) {
		const List = document.createElement('li');
		List.classList.add('navOnclickListElem');
		List.innerHTML = elem.name;
		root.appendChild(List);
	}
};
createNavOnclickContainerList(
	navOnclickContainerList,
	navOnclickContainerListData
);
