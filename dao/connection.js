const db_mysql = require('mysql');
const { db_host, db_user, db_password, db_database } = require('./../config.json');

const connection = db_mysql.createConnection({
	host: db_host,
	user: db_user,
	password: db_password,
	database: db_database
}); 

module.exports = connection;