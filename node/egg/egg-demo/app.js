'use strict';
// 框架在应用初始化的时候，会自动将 HttpClient 初始化到 app.httpclient。
// 同时增加了一个 app.curl(url, options) 方法，它等价于 app.httpclient.request(url, options)。
module.exports = app => {
  app.beforeStart(async () => {
    const result = await app.curl('https://registry.npm.taobao.org/egg/latest', {
      dataType: 'json',
    });
    app.logger.info('Egg latest version: %s', result);
  });
};
