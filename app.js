var logger = require('koa-logger');
var route = require('koa-route');
var session = require('koa-session');
var koa = require('koa');
var app = module.exports = koa();

app.keys = ['meal secret key'];
app.use(session(app));

app.use(logger());

app.use(require('koa-static')(__dirname + '/static', {}));

app.use(function *(next) {
	var user = this.session.user;
	if (!user && this.request.url !== '/login') {
		this.redirect('/login');
	}
	yield next;
});

var index = require('./biz/index');
app.use(route.get('/', index.index));
app.use(route.get('/login', index.login));
app.use(route.post('/login', index.loginAction));
app.use(route.get('/logout', index.logout));

var restaurant = require('./biz/restaurant');
app.use(route.get('/restaurant/:id', restaurant.showRestaurant));
app.use(route.post('/restaurant/order', restaurant.order));

var order = require('./biz/order');
app.use(route.get('/myOrders', order.myOrders));
app.use(route.get('/order/ajax_pay/:id', order.ajaxPay));
app.use(route.get('/order/ajax_cancel_order/:id', order.ajaxCancelOrder));

var admin = require('./biz/admin');
app.use(route.get('/admin', admin.index));
app.use(route.get('/admin/restaurants', admin.restaurants));
app.use(route.get('/admin/new_restaurant', admin.newRestaurant));
app.use(route.post('/admin/new_restaurant', admin.addRestaurant));
app.use(route.get('/admin/restaurant/:id/edit', admin.editRestaurant));
app.use(route.post('/admin/restaurant/:id/edit', admin.updateRestaurant));
app.use(route.get('/admin/ajax_delete_restaurant/:id', admin.ajaxDeleteRestaurant));
app.use(route.get('/admin/orders', admin.orders));
app.use(route.get('/admin/ajax_confirm_pay/:id', admin.ajaxConfirmPay));
app.use(route.get('/admin/ajax_update_serving/:id', admin.ajaxUpdateServing));

app.listen(3000);
console.log('listening on port 3000');