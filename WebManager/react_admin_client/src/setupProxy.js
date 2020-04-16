const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/weather',
        createProxyMiddleware({
            target: 'http://111.230.151.193:5001',
            changeOrigin: true,
            secure: false
        })
    );
};