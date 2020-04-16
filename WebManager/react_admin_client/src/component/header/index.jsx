import React, {Component} from "react";
import moment from "moment";
import {withRouter} from "react-router-dom"
import {Modal} from "antd";
import {reqWeather} from "../../api/api";
import memory_utils from "../../utils/memory_utils";
import memu_config from "../../config/menu_config";
import './index.less';

class HeaderNav extends Component {
    state = {
        currentTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        icon: '',
        text: ''
    }

    getTime = () => {
        // 每隔 1s 获取当前时间并更新 currentTime
        setInterval(() => {
            const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
            this.setState({currentTime})
        }, 1000)
    }

    getWeather = async () => {
        // 获取当前天气
        const {icon, text} = await reqWeather("雷岭镇");
        this.setState({icon, text})
    }

    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        memu_config.forEach(item => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path);
                if (cItem) {
                    title = cItem.title;
                }
            }
        })
        return title;
    }

    /*
    * 第一次 render() 之后执行一次
    * 一般在此执行异步操作：ajax 请求 / 启动定时器
    */
    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    render() {
        const {currentTime, icon, text} = this.state;
        const username = memory_utils.user.username;
        const title = this.getTitle();

        return (
            <div className='header-nav'>
                <div className="header-nav-top">
                    <span>欢迎，{username}</span>
                    <a href="#">退出</a>
                </div>
                <div className="header-nav-bottom">
                    <div className="header-nav-bottom-left">
                        {title}
                    </div>
                    <div className="header-nav-bottom-right">
                        <span>{currentTime}</span>
                        <img src={icon} alt={text} />
                        <span>{text}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HeaderNav);
