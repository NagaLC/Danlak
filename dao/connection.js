const db_mysql = require('mysql');

const connection = db_mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
}); 

module.exports = connection;