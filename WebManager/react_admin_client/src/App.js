/*
    应用根组件
*/

import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";

export default class App extends Component {
    render() {
        return (
            // 嵌套标签最好加上小括号进行返回
            <BrowserRouter>
                <Switch>
                    {/* 只匹配其中一个 */}
                    <Route path='/login' component={Login} />
                    <Route path='/' component={Admin} />
                </Switch>
            </BrowserRouter>
        )
    }
}
