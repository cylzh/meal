var parse = require('co-body');
var render = require('../lib/render');
var config = require('../models/global');

var Restaurant = require('../models/restaurant');
var Order = require('../models/order');

module.exports.showRestaurant = function *(id) {
	var restaurant = yield Restaurant.getRestaurantById(id);
	
	this.body = yield render(this, 'restaurant', {
		restaurant: restaurant
	});
};

module.exports.order = function *() {
	var form = yield parse(this);
	var user = this.session.user;
	var order = new Order({
		user: this.session.user,
		restaurantId: form.restaurantId,
		price: form.price,
		meal:  form.meal,
	});
	yield order.save();
	
	this.redirect('/myOrders');
};