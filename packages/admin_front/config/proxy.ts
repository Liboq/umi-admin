export const proxyConfig = {
  '/api': {
    target: 'http://150.158.213.45:1101',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
