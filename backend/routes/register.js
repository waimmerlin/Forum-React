require("dotenv").config();
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");

const currentDate = require('../components/generateCurrentDate')
const dbMethodsGet = require('../components/dbMethods/dbMethodsGet')
const dbMethodsInsert = require('../components/dbMethods/dbMethodsInsert')
const rolesList = require('../components/roles')

router.post('/', [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 6, max: 16 }).withMessage('Username must be at least 6 and no more than 10 characters')
    .isAlphanumeric().withMessage('Username must contain only English letters and numbers'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isLength({ min: 5, max: 50 }).withMessage('Email must be at least 5 and no more than 50 characters')
    .isEmail().withMessage('Enter a valid email'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 60 }).withMessage('Password must be at least 6 and no more than 60 characters'),
  
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  dbMethodsGet.getUser(username, (err, result) => {
    if (err) {
        return res.status(500).send('Database query error');
    }
    if (result.length > 0) {
        return res.status(500).json({ Error: "User with the same name or email already exists" });
    } else {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ Error: "Error while hashing password" });

            dbMethodsInsert.insertIntoUser(username, email, hashedPassword, rolesList.Member, currentDate(), (err, result2) => {
                if (err) return res.status(500).json({ Error: "Error while inserting" });

                return res.json({ status: "Success" });            
            })
        });
    }
  })
});

module.exports = router;
