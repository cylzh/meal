/**
 * 数据库配置
 */

var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/meal');

module.exports.db = function (collection) {
	return wrap(db.get(collection));
};