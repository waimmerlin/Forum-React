const express = require('express');
const router = express.Router();
const jwtTokens = require('../components/jwtTokens')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");

const dbMethodsGet = require('../components/dbMethods/dbMethodsGet')

router.post('/', [
    body('email')
    .notEmpty().withMessage('Email is required')
    .isLength({ min: 5, max: 50 }).withMessage('Email must be at least 5 and no more than 50 characters')
    .isEmail().withMessage('Enter a valid email'),

    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6, max: 60 }).withMessage('Password must be at least 6 and no more than 65 characters'),
], (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, checked } = req.body;
    dbMethodsGet.getUser(email, (err, result) => {
        if (err) return res.status(500).json({ Error: "Login error in server" });
        if (result.length === 0) return res.status(404).json({ Error: "No user found" });

        bcrypt.compare(password, result[0].password, (err, response) => {
            if (err) return res.status(500).json({ Error: "Password compare error" });
            if (!response) return res.status(401).json({ Error: "Password not matched" });
            
            const user = result[0]
            const userId = user.id;
            const access_token = jwtTokens.signAccessToken({ userId }, { expiresIn: '5m' });
            const refresh_token = jwtTokens.signRefreshToken({ userId }, checked ? { expiresIn: '30d' } : { expiresIn: '1d' });

            const userData = {
                id: user.id,
                username: user.name,
                email: user.email,
                role: user.role,
                registerDate: user.registration_date,
            };

            res.cookie('Refresh_token', refresh_token, {
                secure: true, // Используйте true в production
                sameSite: 'Strict', // Защита от CSRF
                maxAge: checked ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // 30 дней или 1 день 
            });

            res.cookie('Access_token', access_token, {
                secure: true, // Используйте true в production
                sameSite: 'Strict', // Защита от CSRF
                maxAge: 5 * 60 * 1000 // 5 минут
            })

            return res.status(200).json({ status: 'Success', userData });
        });
    })
});

module.exports = router;