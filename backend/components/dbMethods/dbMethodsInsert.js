const db = require('../dbConnect');

function insertIntoUser(name, email, password, role, registrationDate, callback) {
    const sql = "INSERT INTO `users` (`name`, `email`, `password`, `role`, `registration_date`) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [name, email, password, role, registrationDate], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function insertIntoCustomerLogs(userId, username, action, actionDate, callback) {
    const sql = "INSERT INTO `customer_logs` (`user_id`, `user_name`, `action`, `action_date`) VALUES (?, ?, ?, ?)";

    db.query(sql, [userId, username, action, actionDate], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function insertIntoStaffLogs(userId, username, action, actionDate, callback) {
    const sql = "INSERT INTO `staff_logs` (`user_id`, `user_name`, `action`, `action_date`) VALUES (?, ?, ?, ?)";

    db.query(sql, [userId, username, action, actionDate], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

function insertIntoPromocodes(promocodeName, discount, owner, createDate, actiivates, callback ) {
    const sql = "INSERT INTO `promocodes` (`PromocodeName`, `Discount`, `Owner`, `CreateDate`, `Actiivates`) VALUES (?, ?, ?, ?, ?)"

    db.query(sql, [promocodeName, discount, owner, createDate, actiivates], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

module.exports = {
    insertIntoUser,
    insertIntoCustomerLogs,
    insertIntoStaffLogs,
    insertIntoPromocodes
};