var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var app = module.exports = koa();

app.use(logger());

var index = require('./biz/index');

app.use(route.get('/', index.index));

app.listen(3000);
console.log('listening on port 3000');