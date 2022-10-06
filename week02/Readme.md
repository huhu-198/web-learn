#### week02_homework_胡欢

* 完成仿写化简版 dribbble 界面
  * fetch 获取本地 json 数据，通过 JS 动态生成 DOM结构，并对生成图片列表函数进行封装
  * 观察Chrome DevTools 中 dribbble 的的样式，通过 flex 和 grid 基本完成响应式布局（除了顶部的导航栏还未实现响应式）
  * 通过绑定点击事件实现导航栏的点击展开
* 主要难点
  1. flex 布局和 grid 布局同时运用时遇到问题，如父元素是 flex 布局并选择了 align-items: center，子元素用 grid 布局容易有bug，最终用 DevTools 多次调试解决了问题
  2. 对响应式布局不够熟练
