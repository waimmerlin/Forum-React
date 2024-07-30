require("dotenv").config();
const jwt = require("jsonwebtoken");

function signAccessToken(data, params) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, params);
}

function signRefreshToken(data, params) {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, params);
}

function verifyAccessToken(token, callback) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, decoded)
    })
}

function verifyRefreshToken(token, callback) {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, decoded)
    })
}

function updateAccessToken(refreshToken, callback) {
    verifyRefreshToken(refreshToken, (err, decoded) => {
        if (err) {
            return callback(null, null)
        }
        const userId = decoded.userId;
        callback(null, signAccessToken({ userId }, { expiresIn: '5m' }))
    })
}


module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    updateAccessToken
}