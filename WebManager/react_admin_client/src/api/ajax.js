/*
* 封装 ajax 请求模块
*/

import axios from 'axios';

export default function ajax(url, data={}, type='GET') {
    if (type==='GET' || type==='get') {
        return axios.get(url, {
            params: data
        });
    } else {
        return axios.post(url, data);
    }
}
