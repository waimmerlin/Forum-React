const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const access_token = req.access_token;

        if (!user) {
            return res.status(404).json({ Error: 'User not found' });
        }

        const userData = {
            id: user.id,
            username: user.name,
            email: user.email,
            role: user.role,
            registerDate: user.registration_date,
            avatar: Buffer.from(user.avatar).toString('base64')
        };

        res.cookie('Access_token', access_token, {
            secure: true, // Используйте true в production
            sameSite: 'Strict', // Защита от CSRF
            maxAge: 5 * 60 * 1000 // 15 минут
        })

        return res.json({ status: 'Success', userData });
    } catch (error) {
        return res.status(500).json({ Error: 'Error verifying token' });
    }
});
module.exports = router;
