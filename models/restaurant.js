/**
 * 餐馆数据模型
 */

var parse = require('co-body');
var db = require('../lib/db').db('restaurants');

module.exports = Restaurant;

function Restaurant (restaurant) {
	this.name = restaurant.name;
	this.menu = restaurant.menu;
};

Restaurant.prototype.save = function *() {
	var restaurant = {
		name: this.name,
		menu: this.menu
	};
	
	yield db.insert(restaurant);
};

Restaurant.update = function *(id, restaurant) {
	var oldOne = yield db.findOne({
		_id: id
	});
	oldOne.name = restaurant.name;
	oldOne.menu = restaurant.menu;
	yield  db.updateById(id, oldOne);
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

Restaurant.getRestaurantsList = function *() {
	var restaurants = yield db.find({});
	return restaurants;
};