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

const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const protectedRouter = require('./routes/protoctedRoute')
const avatarRouter = require('./routes/avatar')

app.use('/api/v1/protected-route', protectedRouter)
app.use('/api/v1/register', registerRouter)
app.use('/api/v1/login', loginRouter)
app.use('/api/v1/upload-avatar', avatarRouter)

app.listen(PORT, () => {
    console.log(`Server working on Port ${PORT}`);
});