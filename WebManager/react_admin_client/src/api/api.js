/*
* 封装所有请求的接口函数
* 每个函数的返回值都为 promise
*/

import jsonp from "jsonp";
import ajax from "./ajax";
import axios from "axios";
import fetchJsonp from 'fetch-jsonp';

// 登陆函数
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');

// 添加用户函数
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');

// 接口请求函数
export const reqWeather = (location) => {
    const url = `/weather?district=${location}&data_type=now`;
    axios.get(url)
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
// handle error
            console.log(error);
        });
}

reqWeather('雷岭镇');
