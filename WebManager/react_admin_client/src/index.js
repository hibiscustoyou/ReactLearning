/*
    应用入口
*/ 

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import StorageUtils from './utils/storage_utils';
import MemoryUtils from './utils/memory_utils';

// 读取 local 中保存的 user 并存入内存
MemoryUtils.user = StorageUtils.getUser();

// 将 App 组件标签渲染到 index 页面元素
ReactDOM.render(<App />, document.getElementById('root'));
