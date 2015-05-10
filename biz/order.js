var parse = require('co-body');
var render = require('../lib/render');
var config = require('../models/global');
var time = require('../lib/util').time;

var Restaurant = require('../models/restaurant');
var Order = require('../models/order');

module.exports.myOrders = function *() {
	var user = this.session.user;
	var day = time(new Date()).day;
	var orders = yield Order.getOrdersList({
		user: user
	});	
	this.body = yield render(this, 'myOrders', {
		nav: 'myOrders',
		orders: orders
	});
};

module.exports.ajaxPay = function *(id) {
	yield Order.updateOrderStatus(id, 'paid');
	
	this.body = this.query.callback + '(' + JSON.stringify({
		success: true
	}) + ')';
};

module.exports.ajaxCancelOrder = function *(id) {
	yield Order.remove(id);
	
	this.body = this.query.callback + '(' + JSON.stringify({
		success: true
	}) + ')';
};