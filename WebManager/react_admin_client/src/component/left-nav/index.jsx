import React, {Component} from "react";
import {Link} from "react-router-dom";
import { Menu } from 'antd';
import {
    PieChartOutlined,
    MailOutlined,
} from '@ant-design/icons';

import './index.less';
import logo from '../../assets/images/logo.png';

const { SubMenu } = Menu;

export default class LeftNav extends Component {
    render() {
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React 后台</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <PieChartOutlined />
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <MailOutlined />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <span>
                                <MailOutlined />
                                <span>品类管理</span>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <span>
                                <MailOutlined />
                                <span>商品管理</span>
                            </span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
