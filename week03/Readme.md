#### week03*homework*胡欢

- 完成 To Do list 界面和功能
  - 通过 localStorage 将数据存储到本地，通过 Math.random() 生成随机 id， 绑定 input，监听按下回车事件，当 value 不为空时更新 localStorage 数据
  - 绑定删除按钮和完成任务按钮，在点击时更新 localStorage 数据中的列表，并重新渲染列表
  - 动态渲染 list 列表，通过元素的 todo-finished 类决定是否 “已完成”，并能实现保存在本地
- 主要难点
  1. 删除任务选项时对数组的浅拷贝和 splice 有点理解偏差，导致渲染结果错误，通过 MDN 查阅后解决问题
  2. localStorage.getItem 数据和数组的转化尝试了多种方法，最后采用 JSON.parse 和 JSON.stringify
