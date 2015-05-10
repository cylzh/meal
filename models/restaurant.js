/**
 * 餐馆数据模型
 */

var parse = require('co-body');
var db = require('../lib/db').db('restaurants');

module.exports = Restaurant;

function Restaurant (restaurant) {
	this.name = restaurant.name;
	this.menu = restaurant.menu;
	this.serving = restaurant.serving;
};

Restaurant.prototype.save = function *() {
	var restaurant = {
		name: this.name,
		menu: this.menu,
		serving: this.serving
	};
	yield db.insert(restaurant);
};

Restaurant.update = function *(id, restaurant) {
	var oldOne = yield db.findOne({
		_id: id
	});
	
	if (restaurant.name) {
		oldOne.name = restaurant.name;
	}
	if (restaurant.menu) {
		oldOne.menu = restaurant.menu;
	}
	if (typeof restaurant.serving !== 'undefined') {
		oldOne.serving = restaurant.serving;
	}
	
	yield db.updateById(id, oldOne);
};

Restaurant.remove = function *(id) {
	yield db.remove({ 
		_id: id 
	});
};

Restaurant.getRestaurantById = function *(id) {
	var restaurant = yield db.findOne({
		_id: id
	});
	return restaurant;
};

Restaurant.getRestaurantsList = function *(query) {
	query = query || {};
	var restaurants = yield db.find(query);
	return restaurants;
};