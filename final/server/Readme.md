## 后端 - 胡欢

* 使用 koa 实现登录、退出登录、获取人员列表、创建人员列表、修改信息等7个 api 接口，

* 获取人员列表等 api 接口可以实现根据 query 参数搜索功能，同时兼容多种功能

* 对前端传的参数进行了检查，缺失参数或参数异常（如 page 过大或过小）等情况， 会返回报错信息提示前端，对查询人员信息和搜索请求做了特殊判断

* 在接受查询人员列表、修改人员信息等请求后会先根据前端请求的session信息验证登录身份， 验证成功后方可执行

* 登录请求返回给前端后会保存加密的 username 以保持登录状态

* 在获取人员列表、创建人员列表等需要登录的请求，会 log 输出操作的用户名，以留下操作记录

  

这是第一次接触后端相关知识，在环境配置、koa 学习等方面花了一些时间，最终实现了要求功能



**运行后端**

进入 serve 文件夹
`npm i`
` node api.js` 运行，监听 3501 端口



 **测试账号：**

用户名：huhuan

密码： 1234