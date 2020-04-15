const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/weather',
        createProxyMiddleware({
            target: 'http://localhost:5003',
            changeOrigin: true,
            secure: false
        })
    );
};