const express = require('express');
const dotenv = require('dotenv');
const session = require("express-session");
const passport = require("passport");

const userAPIs = require('./api/userAPI');
const postAPIs = require('./api/postAPI');

dotenv.config();

const app = express();

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userAPIs);

app.listen(3000, () => {
    console.log('Running...');
});
