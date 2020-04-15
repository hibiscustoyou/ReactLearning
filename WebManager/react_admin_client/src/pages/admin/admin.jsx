import React, {Component} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';

import MemoryUtils from '../../utils/memory_utils';
import LeftNav from "../../component/left-nav";
import HeaderNav from "../../component/header";

import Category from "../category/category";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Home from "../home/home";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";

const { Footer, Sider, Content } = Layout;

/*
* 后台管理的路由组件
*/
export default class Admin extends Component {
    render() {
        const user = MemoryUtils.user;

        if (!user || !user._id) {
            // 如果内存没有 user 数据则进行跳转到登录页
            return <Redirect to='/login' />  // 在 render 中使用 Redirect 标签
        }

        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <HeaderNav>Header</HeaderNav>
                    <Content style={{backgroundColor: 'white', margin: 20}}>
                        <Switch>
                            <Route path='/category' component={Category} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Route path='/home' component={Home} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Redirect to='/home' />  {/* 未匹配到以上所有路由则重定向到 /home */}
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center', color:'#cccccc'}}>推荐使用 Chrome 浏览器</Footer>
                </Layout>
            </Layout>
        )
    }
}
