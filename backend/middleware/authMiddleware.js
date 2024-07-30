const dbMethodsGet = require('../components/dbMethods/dbMethodsGet');
const jwtTokens = require('../components/jwtTokens');

function authMiddleware(req, res, next) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.headers['refresh-token'];

    if (!refreshToken) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    if (!accessToken || accessToken === "undefined" || accessToken === '') {
        jwtTokens.updateAccessToken(refreshToken, (err, newAccessToken) => {
            if (err || !newAccessToken) {
                return res.status(401).json({ error: "Invalid refresh token" });
            }

            jwtTokens.verifyAccessToken(newAccessToken, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: "Invalid access token" });
                }

                authenticateUser(decoded.userId, newAccessToken, req, res, next);
            });
        });
    } else {
        jwtTokens.verifyAccessToken(accessToken, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid access token" });
            }

            authenticateUser(decoded.userId, accessToken, req, res, next);
        });
    }
}

function authenticateUser(userId, accessToken, req, res, next) {
    dbMethodsGet.getUser(userId, (err, result) => {
        if (err || result.length === 0) {
            return res.status(401).json({ error: "Invalid access token" });
        }

        req.user = result[0];
        req.access_token = accessToken;

        next();
    });
}

module.exports = authMiddleware;
