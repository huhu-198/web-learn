"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_js_1 = require("./types.js");
// import  dayjs  from 'dayjs';
// let dayjs = require('dayjs');
const dayjs_1 = __importDefault(require("dayjs"));
const uuidjs_1 = __importDefault(require("uuidjs"));
console.log(uuidjs_1.default.generate());
console.log((0, dayjs_1.default)(1666165305 * 1000).format());
console.log((0, dayjs_1.default)().unix());
console.log((0, dayjs_1.default)(1666165305 * 1000).format('YYYY年MM月DD日HH:mm:ss'));
// dayjs().format();
const section = document.querySelector('section');
//类型保护，防止添加点击事件时监听键盘报错
const input = document.querySelector('header input');
//todo事件列表
let todos = [];
/*****  增加代办项目 *******/
function createTodoElem(item) {
    //创建dom元素
    const listElement = document.createElement('div');
    //添加是否完成的class
    listElement.classList.add('todo-item');
    if (item.finished === true) {
        listElement.classList.add('todo-finished');
    }
    //dom操作
    section.appendChild(listElement);
    listElement.innerHTML = `<i class="iconfont icon-checkbox"></i>
    <span class="todo-title">${item.content}</span>
    <span class="todo-title todo-time">${(0, dayjs_1.default)(item.ctime * 1000).format('YYYY年MM月DD日HH:mm:ss')}</span>
  <i class="iconfont icon-delete"></i>`;
    //绑定完成按钮和删除按钮事件
    const finishBtn = listElement.querySelector('i.icon-checkbox');
    finishBtn.addEventListener('click', () => changeItemFinished(item));
    const deleteBtn = listElement.querySelector('i.icon-delete');
    deleteBtn.addEventListener('click', () => delItem(item));
    item.el = listElement;
    return listElement; //返回li元素
}
//添加Todo事件，通过第二个参数判断是否为渲染读取的localStorage数据来判断是否要更新存储
function addItem(item, isReadLocalStorage = false) {
    // console.log(item);
    todos.push(item); //更新事件列表
    section.appendChild(createTodoElem(item)); //更新dom树加上生成的元素
    if (isReadLocalStorage === false) {
        //不是读取元素更新，而是手动添加
        saveLocalStorageData(); //更新存储数据
    }
}
// 改变Todo事件完成情况（已完成/未完成）
function changeItemFinished(item) {
    item.finished = !item.finished;
    item.el.className = item.finished ? 'todo-item todo-finished' : 'todo-item';
    item.mtime = (0, dayjs_1.default)().unix();
    saveLocalStorageData();
}
// 删除Todo事件
function delItem(item) {
    section.removeChild(item.el);
    //从todos数组中删除item元素
    todos.splice(todos.indexOf(item), 1);
    saveLocalStorageData();
}
//输入监听
input.addEventListener('keydown', function (e) {
    let inputValue = this.value.trim();
    if (inputValue !== '' && e.key === 'Enter') {
        //  输入回车且内容不为空
        let newElem = new types_js_1.Todo({
            id: uuidjs_1.default.generate(),
            content: inputValue,
            finished: false,
            ctime: (0, dayjs_1.default)().unix(),
            mtime: null,
        });
        addItem(newElem);
        this.value = '';
    }
});
// 读取localStorage数据
let _todos = localStorage.getItem('_todos');
if (_todos) {
    let itemsList = JSON.parse(_todos);
    for (let item of itemsList) {
        let todo = new types_js_1.Todo(item);
        addItem(todo, true);
    }
}
// 更新全部数据到 localStorage
function saveLocalStorageData() {
    localStorage.setItem('_todos', JSON.stringify(todos));
}
