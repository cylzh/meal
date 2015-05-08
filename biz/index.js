var parse = require('co-body');
var render = require('../lib/render');

var Restaurant = require('../models/restaurant');
var global = require('../models/global');

module.exports.index = function *() {
	var restaurantsList = yield Restaurant.getRestaurantsList();
	
	this.body = yield render(this, 'index', {
		global: global,
		restaurants: restaurantsList 
	});
};

module.exports.login = function *() {
	var user = this.session.user;
	if (user) {
		this.redirect('/');
	} else {
		this.body = yield render(this, 'login');
	}
};

module.exports.loginAction = function *() {
	var formBody = yield parse(this);
	if (formBody.user) {
		this.session.user = formBody.user;
		this.redirect('/');
	}
	this.redirect('/login');
};

module.exports.logout = function *() {
	this.session.user = null;
	this.redirect('/login');
};