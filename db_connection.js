var mysql = require('mysql');

exports.init = function () {
    var con = mysql.createConnection({
        host: "localhost",
        database: 'simplestats',
        port: '3306',
        user: "user",
        password: "password"
    });
    
    return con;
};
