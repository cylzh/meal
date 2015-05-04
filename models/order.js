/**
 * 订单数据模型
 */

var parse = require('co-body');
var render = require('./lib/render');
var db = require('./lib/db').db('orders');
var time = require('./lib/util').time;

module.exports = Order;

function Order (order) {
	this.user = order.user;
	this.price = order.price;
	this.meal = order.meal;
	this.day = order.day;
	this.time = order.time;
	this.status = order.status;
};

Order.prototype.save = function *() {
	var order = {
		user: this.user,
		price: this.price,
		meal:  this.meal,
		status: 'new',
		day: time(new Date()).day,
		time: time(new Date()).minute
	};
	
	yield db.insert(order);
};

Order.getOrdersList = function *(query) {
	query = query || {};
	
	var orders = yield db.find(query, {
		sort: {
			status: 1
		}
	});
	
	return orders;
};

Order.updateOrderStatus = function *(id, status) {
	var order = yield db.findOne({
		 _id: id 
	 });
	order.status = status;
	yield db.updateById(id, order);
};