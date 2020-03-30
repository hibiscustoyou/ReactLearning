/*
* 封装 ajax 请求模块
*/

import axios from 'axios';
import {message} from "antd";

export default function ajax(url, data={}, type='GET') {

    return new Promise((resolve, reject) => {
        let promise;
        if (type === 'GET' || type === 'get') {
            promise = axios.get(url, {
                params: data
            });
        } else {
            promise = axios.post(url, data);
        }

        promise.then(res => {
            resolve(res.data);
        }).catch(error => {
            message.error('请求错误：' + error.message);
        })
    })
}
