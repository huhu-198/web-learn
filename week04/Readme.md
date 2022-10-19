#### week04-homework-胡欢

- 完成 To Do list 新增功能

  - 本来打算原先基础上实现了导入id、创建和修改时间记录的功能，因为原先并没有将列表元素和todo数组归为一类，每次更改的时候都要反复定位查询，修改成ts很麻烦，最后参考demo重构了代码，用相似的类将dom元素和todo数组绑定，便于修改和查询
  - 学习了 TS 语法，学会用更严谨的方式构建，同时学会配置 tsconfig，用 tsc 相关命令将 ts 文件编译为 js 文件
  - 引入 UUID 和 dayjs 库，通过 webpack 打包完成对 import 的编译，使其适配浏览器
  - 通过 webpack 打包压缩 html、ts、css文件和相关资源，参考 demo 学会了配置 webpack.config.js、webpack.dev.js、webpack.prod.js 文件，并通过 plugin 和 loader 完成打包
  - 理解了 webpack 的基本流程和打包压缩文件的意义

- 主要难点
  1. 对 TS 上手较快，感觉与 Java相似，编译为 js 文件时有报错，学习 tsconfig 配置后解决
  2. webpack 的打包压缩上花了较多时间，之前对 webpack 的打包模式和相关 package.json 的配置一直不大了解，卡了很久，通过学习 demo 和查阅文档解决了版本不匹配、引入错误等问题，成功打包
