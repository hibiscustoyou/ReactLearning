import React, {Component} from "react";
import {Link} from "react-router-dom";
import { Menu } from 'antd';
import * as icons from '@ant-design/icons';
import Dexie from 'dexie';

import './index.less';
import logo from '../../assets/images/logo.png';
import MenuConfig from "../../config/menu_config";

const { SubMenu } = Menu;

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

export default class LeftNav extends Component {
    getMenuNodes = (MenuConfig) => {
      return MenuConfig.map(item => {
          if (!item.children) {
              // console.log(item.icon);
              return (
                  <Menu.Item key={item.key}>
                      <Link to={item.key}>
                          {dict[item.icon]}
                          {/*<PieChartOutlined />*/}
                          <span>{item.title}</span>
                      </Link>
                  </Menu.Item>
              )
          } else {
              return (
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
              )
          }
      })
    };

    UNSAFE_componentWillMount () {
        this.menuNodes = this.getMenuNodes(MenuConfig);
    }

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
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}
