export const express = require('express');
const dotenv = require('dotenv');
const session = require("express-session");
const cors = require('cors');
export const passport = require("passport");
export const LocalStrategy = require('passport-local').Strategy;

const userAPIs = require('./api/userAPI');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/userAPI', userAPIs);

app.listen(3000, () => {
    console.log('Running...');
});
