/*
* 封装所有请求的接口函数
* 每个函数的返回值都为 promise
*/

import ajax from "./ajax";
import axios from "axios";
import {message} from "antd";

// 登陆函数
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');

// 添加用户函数
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');

// 接口请求函数
export const reqWeather = (location, type='now') => {
    return new Promise((resolve, reject) => {
        const url = `/weather?district=${location}&data_type=${type}`;  // 此处在配置了转发代理后不能再写上原本地址
        axios.get(url).then(function (response) {
            // console.log(response);
            if (response.data.status === 0) {
                const {icon, text} = response.data.result.now;
                // console.log(response.data.result.now);
                // console.log(icon, text);
                resolve({icon, text})
            } else {
                // console.log(response.data.msg);
                message.error(response.data.msg)
            }
        }).catch(function (error) {
            console.log('weather api error', error);
        });
    })
}

// reqWeather('雷岭镇');
