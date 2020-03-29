/*
* 封装所有请求的接口函数
* 每个函数的返回值都为 promise
*/

import ajax from "./ajax";

// 登陆函数
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');

// 添加用户函数
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST');
