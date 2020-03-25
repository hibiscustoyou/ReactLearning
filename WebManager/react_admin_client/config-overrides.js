const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(

    // 针对 antd 实现按需打包：根据 import 来打包 （使用 bable-plugin-import）
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDiretory: 'es',
        style: true,  // 自动打包相关样式
    }),

    addLessLoader({
        // 自定义主题
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A'
        }
    })
)