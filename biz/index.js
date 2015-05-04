/**
 * 首页
 */

var parse = require('co-body');
var render = require('../lib/render');

var restaurantModel = require('../models/restaurant');

module.exports.index = function *() {
	var restaurantsList = yield restaurantModel.getRestaurantsList();
	
	this.body = yield render('index', { restaurants: restaurantsList });
};