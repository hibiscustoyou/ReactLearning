/*
* 进行 local 数据存储模块
*/
import store from 'store';

const USER_KEY = 'user_key';

export default {
    saveUser(user) {
        store.set(USER_KEY, user);
    },

    getUser() {
        return store.get(USER_KEY) || {};
    },

    removeUser() {
        store.remove(USER_KEY);
    }
}
