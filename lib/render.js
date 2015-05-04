/**
 * 渲染配置
 */

var views = require('co-views');

module.exports = views(__dirname + '/../views', {
  map: { html: 'swig' }
});