const input = document.querySelector('header input');
const section = document.querySelector('section');

/*****  增加代办项目 *******/
input.addEventListener('keydown', function (e) {
	if (this.value !== '' && e.keyCode === 13) {
		//  输入回车且内容不为空
		const inputValue = this.value;
		let localDataJSon = localStorage.getItem('_todos') || '[]'; //考虑空项目
		let localData = JSON.parse(localDataJSon);

		const newID = Math.random().toString();
		const newElem = {
			id: newID,
			content: inputValue,
			finished: false,
		};
		localData.push(newElem);
		localStorage.setItem('_todos', JSON.stringify(localData)); //  保存新列表

		this.value = '';
		toDoList(); //  重新渲染
	}
});

/*****  渲染代办列表 *******/
function toDoList() {
	section.innerHTML = ''; //先清空现有选项，重新渲染
	let localData = JSON.parse(localStorage.getItem('_todos') || '[]'); //考虑空项目

	for (let i = 0; i < localData.length; i++) {
		let elem = localData[i];
		const listElement = document.createElement('div');
		listElement.classList.add('todo-item');
		section.appendChild(listElement);

		if (elem.finished === true) {
			listElement.classList.add('todo-finished');
		}

		listElement.innerHTML = `<i class="iconfont icon-checkbox"></i>
			  <span class="todo-title">${elem.content}</span>
			<i class="iconfont icon-delete"></i>`;

		//删除操作
		const deleteBtn = listElement.querySelector('.icon-delete');
		deleteBtn.addEventListener('click', function () {
			let localDataTemp = JSON.parse(localStorage.getItem('_todos') || '[]');
			let new_arr = localDataTemp.slice(0); //拷贝数组
			new_arr.splice(i, 1); //去掉删除项
			localStorage.setItem('_todos', JSON.stringify(new_arr)); //重新保存删除后的新数组
			toDoList(); //重新渲染
		});

		//完成任务操作
		const finishBtn = listElement.querySelector('.icon-checkbox');
		finishBtn.addEventListener('click', function () {
			let localDataTemp = JSON.parse(localStorage.getItem('_todos') || '[]');
			let new_arr = localDataTemp.slice(0); //拷贝数组
			new_arr[i].finished = !new_arr[i].finished;
			localStorage.setItem('_todos', JSON.stringify(new_arr)); //重新保存删除后的新数组
			toDoList(); //重新渲染
		});
	}
}

toDoList();
