const connection = require('./connection');

class DaoEvent {

	constructor(guildId, content, token) {
		this.guildId = guildId !== undefined ? guildId : 0; 
		this.content = content !== undefined ? content : ""; 
		this.token = token !== undefined ? token : 0;
	}

	parseRow(row) {
		return JSON.parse(JSON.stringify(row));
	}

	static find(guildId, callback) {
		let sql = "SELECT content AS url FROM event WHERE guildId = ?";
		connection.query(sql, guildId, function (err, row) {
			if (err) throw err;
			callback(row[0]);
		});
	}

	static count(guildId, callback) {
		let sql = "SELECT COUNT(*) AS nb FROM event WHERE guildId = ?";
		connection.query(sql, guildId, function (err, row) {
			if (err) throw err;
			callback(row[0].nb);
		});
	}

	static create(guildId, content, callback) {
		let sql = "INSERT INTO event (guildId, content) VALUES (?,?)";
		connection.query(sql, [guildId, content], function (err, result) {
			if (err) throw err;
			callback(result);
		});		
	}

	static update(guildId, content, callback) {
		let sql = "UPDATE event SET content = ? WHERE guildId = ?";
		connection.query(sql, [content, guildId], function (err, result) {
			if (err) throw err;
			callback(result);
		});		
	}
}

module.exports = DaoEvent;