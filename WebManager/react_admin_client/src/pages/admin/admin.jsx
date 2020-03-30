import React, {Component} from "react";
import { Redirect } from "react-router-dom";

import MemoryUtils from '../../utils/memory_utils';

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
            <div>
                Hello {user.username}
            </div>
        )
    }
}
