const db = require('../dbConnect');

function updateUserById(id, updateData, callback) {
    let sql = "UPDATE `users` SET ";
    let params = [];
    
    if (updateData.username !== undefined) {
        sql += "`name` = ?, ";
        params.push(updateData.username);
    }
    if (updateData.email !== undefined) {
        sql += "`email` = ?, ";
        params.push(updateData.email);
    }
    if (updateData.role !== undefined) {
        sql += "`role` = ?, ";
        params.push(updateData.role);
    }
    if (updateData.avatar !== undefined) {
        sql += "`avatar` = ?, ";
        params.push(updateData.avatar);
    }

    sql = sql.slice(0, -2);
    sql += " WHERE `id` = ?";
    params.push(id);
    
    db.query(sql, params, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function updatePromocodeById(id, updateData, callback) {
    let sql = "UPDATE `promocodes` SET ";
    let params = [];
    
    if (updateData.promocodeName !== undefined) {
        sql += "`PromocodeName` = ?, ";
        params.push(updateData.promocodeName);
    }
    if (updateData.discount !== undefined) {
        sql += "`Discount` = ?, ";
        params.push(updateData.discount);
    }
    if (updateData.owner !== undefined) {
        sql += "`Owner` = ?, ";
        params.push(updateData.owner);
    }
    if (updateData.createDate !== undefined) {
        sql += "`CreateDate` = ?, ";
        params.push(updateData.createDate);
    }
    if (updateData.actiivates !== undefined) {
        sql += "`Actiivates` = ?, ";
        params.push(updateData.actiivates);
    }

    sql = sql.slice(0, -2);
    sql += " WHERE `PromocodeID` = ?";
    params.push(id);

    db.query(sql, params, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function updateKeyById(id, updateData, callback) {
    let sql = "UPDATE `wenose_keys` SET ";
    let params = [];
    
    if (updateData.key !== undefined) {
        sql += "`key` = ?, ";
        params.push(updateData.key);
    }
    if (updateData.canActivates !== undefined) {
        sql += "`can_activates` = ?, ";
        params.push(updateData.canActivates);
    }
    if (updateData.subUntil !== undefined) {
        sql += "`sub_until` = ?, ";
        params.push(updateData.subUntil);
    }

    sql = sql.slice(0, -2);
    sql += " WHERE `KeyID` = ?";
    params.push(id);

    db.query(sql, params, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

module.exports = {
    updateUserById,
    updatePromocodeById,
    updateKeyById
};
