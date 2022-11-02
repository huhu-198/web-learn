#### week05-homework-胡欢

- 使用 React 框架和函数式的开发模式完成 ToDolist 的重构
  - 通过 useState 完成输入框 value 和 ToDolist 数据的绑定
  - 通过 tsx 限制了函数接口 ITodo 格式，增加代码健壮性
  - 将列表框架作为父组件，列表元素和输入框元素拆分为子组件，通过 props 实现父子组件间通信，传递函数和 ToDolist 列表值
  - 通过解构语法完成新增 ToDolist 事件的 state 更新
  - 读取 ToDolist 列表，通过 map 函数遍历更新列表，调用并渲染 ToDoItem 子组件
  - 通过 useEffect hook 实现第一次加载时，读取 localStorage 中的 todos
- 新增排序功能
  - 通过封装 setOrderToDoList 函数，在每次 setToDoList 之前先将 ToDolist 数据根据要求排序，再设置 state 值
- 主要难点
  1. 生成列表 key 值设置问题，起初在子组件中添加 key，产生警告，学习相关知识后了解应该在父组件 map 时就添加 key 值
  2. 调用 ToDoItem 子组件时，选择传递 id 还是列表的 index 思考了较久，尝试了两种方案并学习相关 demo 后选择了传递唯一的 id，在更新和删除子组件时通过函数返回给父组件，来定位 state 中的具体元素
  3. 拆分 input 组件后，尝试通过 useMemo 减少不必要的渲染，后发现 input 组件必须要监听的 ToDolist 的更新，否则无法正确添加 ToDolist 事件，查阅相关资料，推测与 input 的增加 ToDolist 事件函数 addToDoList 中用到了原 ToDolist 数据有关
