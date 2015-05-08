/**
 * 渲染配置
 */

var views = require('co-views');
var global = require('../models/global');

var render = views(__dirname + '/../views', {
  map: { html: 'swig' }
});

module.exports = function *(app, view, obj) {
  obj = obj || {};
  obj.user = null;

  if (app.session.user) {
      obj.user = {
      name: app.session.user,
      isAdmin: global.adminUser.indexOf(app.session.user) !== -1
    };
  }
  return yield render(view, obj);
};