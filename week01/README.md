#### week01_homework_胡欢

* 完成仿写 QQ 音乐界面
  * 将 json 数据存放在数组中，通过 JS 动态生成 DOM结构
  * 观察Chrome DevTools 中样例demo的的样式，通过改变 classList，使新生成的适配已提供的css样式，成功复现demo样式（为了美观隐藏了部分焦点光标）
  * 在 main.js 中通过 for 循环动态生成 tabs 和 section 中的music list
* 主要难点
  1. tabs 中点击切换，通过监听 tabs 点击事件实现，删除其他元素的class：tab-active，为点击的元素增加 class：tab-active，并在点击已选中的选项时（classList 包含 tab-active），阻断监听的传播，不进行操作
  2. tabs 中切换选项，通过数组 sectionListArray 保存加载过的music list，并且在删除某一项音乐后，直接对 sectionListArray 操作，保证删除记录被保留（即来回切换不会丢失）
  3. tabs 中切换选项，点击过去加载过的选项，不再重复生成doms，直接调用 sectionListArray 中记录的section 元素，索引值为地区id，清除原有 section 并添加新 section

​	