import React, {Component} from "react";
import './index.less';

export default class HeaderNav extends Component {
    render() {
        return (
            <div className='header-nav'>
                <div className="header-nav-top">
                    <span>欢迎，admin</span>
                    <a href="/">退出</a>
                </div>
                <div className="header-nav-bottom">
                    <div className="header-nav-bottom-left">
                        首页
                    </div>
                    <div className="header-nav-bottom-right">
                        <span>2020-4-9 13:30:30</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="qing"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
