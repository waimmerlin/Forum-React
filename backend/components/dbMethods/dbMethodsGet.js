const db = require('../dbConnect');

function getUser(query, callback) {
    let sql = '';

    if (!isNaN(query)) {
      sql = "SELECT * FROM `users` WHERE `id` = ?";
    } else if (query.includes('@')) {
      sql = "SELECT * FROM `users` WHERE `email` = ?";
    } else {
      sql = "SELECT * FROM `users` WHERE `name` = ?";
    }
    db.query(sql, [query], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function getTableDataWithPagination(table, limit, offset, callback) {
    let sql;
    let params;
    
    if (limit !== undefined && offset !== undefined) {
        sql = `SELECT * FROM ?? LIMIT ? OFFSET ?`;
        params = [table, limit, offset];
    } else {
        sql = `SELECT * FROM ??`;
        params = [table];
    }
    
    db.query(sql, params, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function getNumberOfRowsFromTable(table, callback) {
    const sql = `SELECT COUNT(*) AS rowsCount FROM ??`;
    db.query(sql, [table], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function getInfoAboutKeyBykey(key, callback) {
    const sql = "SELECT * FROM `wenose_keys` WHERE `key` = ?";
    db.query(sql, [key], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

module.exports = {
    getUser,
    getTableDataWithPagination,
    getNumberOfRowsFromTable,
    getInfoAboutKeyBykey
};
