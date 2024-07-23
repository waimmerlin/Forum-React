const express = require('express')

const app = express();
app.use(express.json());
const helmet = require('helmet');
const path = require('path')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('./components/dbConnect')

app.disable('x-powered-by')
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

const PORT = process.env.PORT || 3001;

// app.get('*', (req, res, next) => {
//     if (req.originalUrl.startsWith('/api')) {
//       return next();
//     }
//     res.sendFile(path.join(__dirname, '/build', 'index.html'));
// });


app.listen(PORT, () => {
    console.log(`Server working on Port ${PORT}`);
});