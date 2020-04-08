import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import { Menu } from 'antd';
import * as icons from '@ant-design/icons';

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

class LeftNav extends Component {
    /*
    * 根据 MenuConfig 生成对应的标签数组
    * 使用 map + 递归
    */
    getMenuNodesMap = (MenuConfig) => {
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

    UNSAFE_componentWillMount () {
        this.menuNodes = this.getMenuNodes(MenuConfig);
    }

    render() {
        // 获取当前请求路由路径
        const currentPath = this.props.location.pathname;
        const openKey = this.openKey

        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React 后台</h1>
                </Link>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[currentPath]}
                    defaultOpenKeys={[openKey]}
                >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

/*
* withRouter 高阶组件：
*   包装非路由组件，返回新组件，新组件向非路由组件传递 3 个属性：
*   history location match
*/
export default withRouter(LeftNav)
