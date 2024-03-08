export const proxyConfig = {
  '/api': {
    target: 'http://127.0.0.1:1101',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
