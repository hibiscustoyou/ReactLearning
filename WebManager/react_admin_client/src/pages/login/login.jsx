import React, {Component} from "react";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less'
import logo from './images/logo.jpg'

/*
* 登陆的路由组件
*/

// const Item = Form.Item;

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
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>React 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '用户名不能为空' },
                                { min: 3, message: '用户名不能低于 3 位' },
                                { max: 12, message: '用户名不能高于 12 位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名限定为字母数字及下划线组成' },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[

                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        console.log('rule:', rule);
                                        console.log('value:', value);
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
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/**/
