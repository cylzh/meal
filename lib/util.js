/**
 * 工具方法
 */

module.exports.time = function (date) {
    date = date || new Date();

    return {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))),
        day: date.getFullYear() + "-" 
        + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + "-" 
        + (date.getDate() > 9 ? date.getDate() : ('0' + date.getDate()) ),
        minute: date.getFullYear() + "-" 
        + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + "-" 
        + (date.getDate() > 9 ? date.getDate() : ('0' + date.getDate()) ) + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };
};