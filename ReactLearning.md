# React 后台管理

### 一、项目目录结构

```
⮛ src
|	> api			// ajax
|	> assets		// 公用资源
|	> component		// 非路由组件
|	> config		// 配置
|	> pages			// 路由页面
|	> utils			// 工具模块
|	App.js			// 应用根组件
|	index.js		// 应用入口
config-overrides.js
package.json
```

### 二、引入 antd 组件库

1. 下载组件库包

   ```
   yarn add antd
   ```

2. 实现组件按需打包（不打包无用组件）
   + 下载 3 个依赖组件

     ```
     yarn add react-app-rewied customize-cra babel-plugin-import
     ```

   + 编写加载配置文件 config-overrides.js

     ```js
     const {override, fixBabelImports} = require('customize-cra');
     
     module.exports = override(
     
         // 针对 antd 实现按需打包：根据 import 来打包 （使用 bable-plugin-import）
         fixBabelImports('import', {
             libraryName: 'antd',
             libraryDiretory: 'es',
             style: 'css',  // 自动打包相关样式
         }),
     )
     ```
     
   + 修改 package.json 的 script 配置
   
     ```json
       // "scripts": {
       //   "start": "react-scripts start",
       //   "build": "react-scripts build",
       //   "test": "react-scripts test",
       //   "eject": "react-scripts eject"
       // },
       
         "scripts": {
             "start": "react-app-rewired start",
             "build": "react-app-rewired build",
             "test": "react-app-rewired test",
             "eject": "react-app-rewired eject"
           },
     ```
   
3. 自定义 antd 主题

   + 下载工具包

     ```
     yarn ad less less-loader
     ```

   + 修改 config-overrides.js

     ```js
     const {override, fixBabelImports, addLessLoader} = require('customize-cra');
     
     module.exports = override(
     
         // 针对 antd 实现按需打包：根据 import 来打包 （使用 bable-plugin-import）
         fixBabelImports('import', {
             libraryName: 'antd',
             libraryDiretory: 'es',
             style: true,  // 自动打包相关样式
         }),
     
         addLessLoader({
             javascriptEnabled: true,
             modifyVars: {
                 '@primary-color': '#1DA57A'
             }
         })
     )
     ```


### 三、引入路由

1. 下载路由包

   ```
   yarn add react-router-dom
   ```

2. 附加知识点

   ```
   - js 文件与 jsx 文件：
     > js：即JavaScript，一种直译式脚本语言
     > jsx: 即 JavaScript XML，一种在 React 组建内部构建标签的类XML语法。(增强 React 程序组件的可读性)
     目前在 react 最主要的使用区别在于：
     > js 用作模块使用，也可用作组件，但在开发中往往将两者进行分开，方便区分模块组件
     > jsx 用作组件进行使用
   
   - BrowserRouter 组件与 HashRouter 组件区别：
     > https://www.cnblogs.com/flamestudio/p/11965991.html
   ```


### 四、引入表单

1. 使用 antd 中的表单组件，参考https://ant.design/components/form-cn/#components-form-demo-basic

2. 更新为 antd 4.0+ 版本后对表单的处理

   https://ant.design/components/form/v3-cn/

   **onFinish 替代 onSubmit**

   对于表单校验，过去版本需要通过监听 `onSubmit` 事件手工触发 `validateFields`。新版直接使用 `onFinish` 事件，该事件仅当校验通过后才会执行：

   ```jsx
   // antd v3
   const Demo = ({ form: { getFieldDecorator, validateFields } }) => {
     const onSubmit = e => {
       e.preventDefault();
       validateFields((err, values) => {
         if (!err) {
           console.log('Received values of form: ', values);
         }
       });
     };
   
     return (
       <Form onSubmit={onSubmit}>
         <Form.Item>
           {getFieldDecorator('username', {
             rules: [{ required: true }],
           })(<Input />)}
         </Form.Item>
       </Form>
     );
   };
   
   const WrappedDemo = Form.create()(Demo);
   ```

   ```jsx
   // antd v4
   const Demo = () => {
     const onFinish = values => {
       console.log('Received values of form: ', values);
     };
   
     return (
       <Form onFinish={onFinish}>
         <Form.Item name="username" rules={[{ required: true }]}>
           <Input />
         </Form.Item>
       </Form>
     );
   };
   ```

   在 V3 中需要使用到 Form.create() 方法，再利用 getFieldDecorator 来接收字段对象和验证规则；
   
   在 V4 中舍弃了 Form.create() 方法，利用 onFinish() 方法进行简化验证过程，当验证成功并返回到相对应处理函数时便可直接获取到 values，其存放了当前表单的基本数据，按需获取表单对应字段即可。