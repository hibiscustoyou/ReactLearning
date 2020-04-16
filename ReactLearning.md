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

本项目所引入的 antd 版本为 4.0.4

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
   
3. 对登陆表单的简单验证

   更多的规则详见 [规则](https://ant.design/components/form-cn/#Rule)

   | 名称            | 说明                                                         | 类型                                                         |
   | --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
   | enum            | 是否匹配枚举中的值                                           | any[]                                                        |
   | len             | string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度 | number                                                       |
   | max             | string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 | number                                                       |
   | message         | 错误信息，不设置时会通过[模板](https://ant.design/components/form-cn/#validateMessages)自动生成 | string                                                       |
   | min             | string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 | number                                                       |
   | pattern         | 正则表达式匹配                                               | RegExp                                                       |
   | required        | 是否为必选字段                                               | boolean                                                      |
   | transform       | 将字段值转换成目标值后进行校验                               | (value) => any                                               |
   | type            | 类型，常见有 `string` |`number` |`boolean` |`url` | `email`。更多请参考[此处](https://github.com/yiminghe/async-validator#type) | string                                                       |
   | validator       | 自定义校验，接收 Promise 作为返回值。[示例](https://ant.design/components/form-cn/#components-form-demo-register)参考 | ([rule](https://ant.design/components/form-cn/#Rule), value) => Promise |
   | whitespace      | 如果字段仅包含空格则校验不通过                               | boolean                                                      |
   | validateTrigger | 设置触发验证时机，必须是 Form.Item 的 `validateTrigger` 的子集 | string \| string[]                                           |

   + 声明式校验

     直接使用已定义好的属性进行定义

   ```jsx
   <Form.Item
       name="username"
       rules={
           [
               { required: true, message: '用户名不能为空' },
               { min: 3, message: '用户名不能低于 3 位' },
               { max: 12, message: '用户名不能高于 12 位' },
               { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名限定为字母数字及下划线组成' },
           ]
       }
   >
   ```

   + 自定义校验
   
     ```jsx
     <Form.Item
         name="password"
         rules={[
             ({ getFieldValue }) => ({
                 validator(rule, value) {
                     // console.log('rule:', rule);
                     // console.log('value:', value);
                     if (!value) {
                         return Promise.reject('密码不能为空');
                     } else if (value.length < 3) {
                         return Promise.reject('密码长度不低于 3 位');
                     }  else if (value.length > 12) {
                         return Promise.reject('密码长度不高于 12 位');
                     } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                         return Promise.reject('密码格式不符合要求');
                     } else {
                         return Promise.resolve();
                     }
                 },
             }),
         ]}
     >
     ```
   
4. 回调函数

   ```jsx
   export default class Login extends Component {
       render() {
           const onFinish = values => {
               // 成功的返回
               console.log('Received values of form: ', values);
           };
           const onFinishFailed = errorInfo => {
               // 失败的返回
               console.log('Failed:', errorInfo);
           };
           return (
               <div className="login">
                   <section className="login-content">
                       <Form
                           name="normal_login"
                           className="login-form"
                           initialValues={{ remember: true }}
                           onFinish={onFinish}
                           onFinishFailed={onFinishFailed}
                       >
                           ...
                       </Form>
                   </section>
               </div>
           )
       }
   }
   ```


### 六、封装 ajax 请求模块

1. 引入依赖库

   ```
   yarn add axios
   ```

2. 封装 ajax 函数

   ```jsx
   import axios from 'axios';
   
   export default function ajax(url, data={}, type='GET') {
       if (type==='GET' || type==='get') {
           return axios.get(url, {
               params: data
           });
       } else {
           return axios.post(url, data);
       }
   }
   ```

3. 封装 api 函数

   ```jsx
   import ajax from "./ajax";
   
   // 登陆函数
   export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');
   ```

4. 在 login.jsx 组件中使用 reqLogin()

   .then()：成功调用

   .catch()：失败调用
   
   ```jsx
   render() {
       const onFinish = values => {
           // 成功的返回
        console.log('Received values of form: ', values);
           const {username, password} = values;  // 类似 python 的元组解包
           reqLogin(username, password).then(r => {
               console.log('ajax 成功：', r.data);
           }).catch(e => {
               console.log('ajax 失败：', e);
           });
       };
       ...
   }
   ```
   
5. 在 package.json 中添加代理

   通过在 package.json 文件中配置代理可以解决 ajax 请求跨域问题，利用代理进行转发请求

   ```json
   {
   	...,
       "proxy": "http://localhost:5000"
   }
   ```

6. 使用 async 和 await 简化 promise 对象的使用

   + 如何简化与作用？

     \> 不再使用 .then() 函数来指定 **成功** / **失败** 的回调函数

     \> 以同步编码方式（无回调函数）实现异步流程

   + 语法

     ```jsx
     const onFinish = async (values) => {
         const {username, password} = values;  // 类似 python 的元组解包
         try {
             const res = await reqLogin(username, password);
             console.log('请求成功：', res.data);
         } catch (e) {
             console.log('请求失败：', e);
         }
     };
     ```

     \> async：写在异步函数 (values) 定义左侧

     \> await：写在返回 promise 表达式 reqLogin() 左侧，只返回 promise 异步执行成功的 数据

### 七、持久化登陆

1. 使用 store 库封装 localStorage

   ```
   yarn add store
   ```

2. store 基本使用

   ```jsx
   import store from 'store';
   
   // Store current user
   store.set('user', { name:'Marcus' })
   
   // Get current user
   store.get('user')
   
   // Remove current user
   store.remove('user')
   
   // Clear all keys
   store.clearAll()
   
   // Loop over all stored values
   store.each(function(value, key) {
   	console.log(key, '==', value)
   })
   ```


### 八、添加左侧菜单栏

1. 动态渲染菜单列表

   ```js
   /*
   * /src/config/menu_config.js
   * 新增菜单配置页，需要添加其他菜单功能只需在此数组继续增加
   * 需要注意的一个点是组件对象不能作为数值直接传递给前端页面进行渲染，
   * 因此需要传递对应的组件字符串，再在前端页面利用字典将组件字符串进行转化为组件
   */
   const MenuConfig = [
       {
           title: '首页',  // 菜单标题名称
           key: '/home',  // 对应的path
           icon: "<HomeOutlined />",  // 图标名称
           isPublic: true,  // 公开的
       },
       {
           title: '商品',
           key: '/products',
           icon: "<AppstoreOutlined />",
           children: [  // 子菜单列表
               {
                   title: '品类管理',
                   key: '/category',
                   icon: "<BarsOutlined />"
               },
               {
                   title: '商品管理',
                   key: '/product',
                   icon: "<ToolOutlined />"
               },
           ]
       },
       ...
   ];
   
   export default MenuConfig;
   ```

2. 添加左侧菜单跳转路由以及优化 LeftNav 组件逻辑

   ```jsx
   /*
   * /src/component/left-nav/index.jsx
   */
   import * as icons from '@ant-design/icons';
   const dict = {
       "<HomeOutlined />": <icons.HomeOutlined />,
       "<AppstoreOutlined />": <icons.AppstoreOutlined />,
       "<BarsOutlined />": <icons.BarsOutlined />,
       "<ToolOutlined />": <icons.ToolOutlined />,
       "<UserOutlined />": <icons.UserOutlined />,
       "<SafetyOutlined />": <icons.SafetyOutlined />,
       "<FundOutlined />": <icons.FundOutlined />,
       "<BarChartOutlined />": <icons.BarChartOutlined />,
       "<LineChartOutlined />": <icons.LineChartOutlined />,
       "<PieChartOutlined />": <icons.PieChartOutlined />,
       "<MenuOutlined />": <icons.MenuOutlined />,
   }
   
   ...
   
   /*
   * 根据 MenuConfig 生成对应的标签数组
   * 使用 reduce + 递归
   */
   getMenuNodes = (MenuConfig) => {
       return MenuConfig.reduce((pre, item) => {
           // 获取当前请求路由路径
           const currentPath = this.props.location.pathname;
   
           if (!item.children) {
               // 向 pre 添加 <Menu.Item>
               pre.push((
                   <Menu.Item key={item.key}>
                       <Link to={item.key}>
                           {dict[item.icon]}
                           {/*<PieChartOutlined />*/}
                           <span>{item.title}</span>
                       </Link>
                   </Menu.Item>
               ))
           } else {
               const childrenItem = item.children.find(childrenItem => childrenItem.key===currentPath);
               if (childrenItem) {
                   this.openKey = item.key;
               }
   
               // 向 pre 添加 <SubMenu>
               pre.push((
                   <SubMenu
                       key={item.key}
                       title={
                           <span>
                               {dict[item.icon]}
                               <span>{item.title}</span>
                           </span>
                       }
                       >
                       {this.getMenuNodes(item.children)}
                   </SubMenu>
               ))
           }
           return pre
       }, [])
   }
   ```

### 九、Api 接口封装 json

1. 跨域问题：

   引入 http-proxy-middleware 库添加多个转发代理

   ```
   yarn add http-proxy-middleware
   ```

   新建 /src/setupProxy.js

   ```js
   const { createProxyMiddleware } = require('http-proxy-middleware');
   
   module.exports = function(app) {
       app.use(
           '/weather',
           createProxyMiddleware({
               target: 'http://111.230.151.193:5001',
               changeOrigin: true,
               secure: false
           })
       );
   };
   ```

   使用转发代理

   ```js
   export const reqWeather = (location) => {
       return new Promise((resolve, reject) => {
           const url = `/weather?district=${location}&data_type=now`;  // 此处在配置了转发代理后不能再写上原本地址
           axios.get(url).then(function (response) {
               console.log(response);
           }).catch(function (error) {
               console.log('weather api error', error);
           });
       })    
   }
   ```

2. 动态显示当前时间和天气