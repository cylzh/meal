/**
 * 订单数据模型
 */

var parse = require('co-body');
var render = require('../lib/render');
var db = require('../lib/db').db('orders');
var time = require('../lib/util').time;

var Restaurant = require('./restaurant');

module.exports = Order;

function Order (order) {
	this.user = order.user;
	this.restaurantId = order.restaurantId;
	this.price = order.price;
	this.meal = order.meal;
};

Order.prototype.save = function *() {
	var order = {
		user: this.user,
		price: this.price,
		meal:  this.meal,
		restaurantId: this.restaurantId,
		status: 'new', // 状态有new paid success 三种状态
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
	
	for (var i = 0; i < orders.length; i ++) {
		if (orders[i].restaurantId) {
			var restaurant = yield Restaurant.getRestaurantById(orders[i].restaurantId);
			orders[i].restaurantName = restaurant.name;
		}
	}
	
	return orders;
};

Order.updateOrderStatus = function *(id, status) {
	var order = yield db.findOne({
		 _id: id 
	 });
	order.status = status;
	yield db.updateById(id, order);
};

Order.remove = function *(id) {
	yield db.remove({ 
		_id: id 
	});
};