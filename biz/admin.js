var parse = require('co-body');
var render = require('../lib/render');
var config = require('../models/global');
var time = require('../lib/util').time;

var Restaurant = require('../models/restaurant');
var Order = require('../models/order');

module.exports.index = function *() {
	authorize(this);
	
	var restaurantsList = yield Restaurant.getRestaurantsList();
	var ordersList = yield Order.getOrdersList({
		day: time(new Date()).day
	});
	
	this.body = yield render(this, 'admin', {
		nav: 'admin',
		restaurants: restaurantsList,
		ordersCount: ordersList.length
	});
};

module.exports.newRestaurant = function *() {
	authorize(this);
	
	this.body = yield render(this, 'newRestaurant', {
		nav: 'admin'
	});
};

module.exports.addRestaurant = function *() {
	authorize(this);
	
	var form = yield parse(this);
	var restaurant = new Restaurant({
		name: form.name,
		menu: JSON.parse(form.menu)
	});
	
	yield restaurant.save();
	
	this.redirect('/admin');
};

module.exports.editRestaurant = function *(id) {
	authorize(this);
	
	var restaurant = yield Restaurant.getRestaurantById(id);
	if (!restaurant) {
		this.throw(404, '你看到了不该看的东西！');
	}
	this.body = yield render(this, 'editRestaurant', {
		restaurant: restaurant
	});
};

module.exports.updateRestaurant = function *(id) {
	authorize(this);
	
	var form = yield parse(this);
	var restaurant = new Restaurant({
		name: form.name,
		menu: JSON.parse(form.menu)
	});
	
	yield Restaurant.update(id, restaurant);
	
	this.redirect('/admin');
};

module.exports.ajaxDeleteRestaurant = function *(id) {
	authorize(this);
	
	var query = this.query;
	
	yield Restaurant.remove(id);
	
	this.body = query.callback + '(' + JSON.stringify({
		success: true
	}) + ')';
};

module.exports.orders = function *() {
	authorize(this);
	
	var query = this.query;
	var day = query.day || time(new Date()).day
	var ordersList = yield Order.getOrdersList({
		day: day
	});
	
	this.body = yield render(this, 'orders', {
		day: day,
		orders: ordersList
	});
};

module.exports.ajaxConfirmPay = function *(id) {
	yield Order.updateOrderStatus(id, 'success');
	
	this.body = this.query.callback + '(' + JSON.stringify({
		success: true
	}) + ')';
};

module.exports.ajaxUpdateServing = function *(id) {
	var query = this.query;
	
	yield Restaurant.update(id, {
		serving: query.serving === 'true'
	});
	
	this.body = this.query.callback + '(' + JSON.stringify({
		success: true
	}) + ')';		
};

function authorize (app) {
	var user = app.session.user;
	if (config.adminUser.indexOf(user) === -1) {
		app.throw(404, '你看到了不该看的东西！');
	}
}