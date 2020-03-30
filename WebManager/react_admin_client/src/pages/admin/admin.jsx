import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import { Layout } from 'antd';

import MemoryUtils from '../../utils/memory_utils';
import LeftNav from "../../component/left-nav";
import HeaderNav from "../../component/header"

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
                    <Content style={{backgroundColor: 'white'}}>Content</Content>
                    <Footer style={{textAlign:'center', color:'#cccccc'}}>推荐使用 Chrome 浏览器</Footer>
                </Layout>
            </Layout>
        )
    }
}
