const bodyParser = require('body-parser');
const express = require('express');
const session = require("express-session");
const passport = require("passport");

const userAPIs = require('./api/userAPI');
const postAPIs = require('./api/postAPI');

const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use('/api/user', userAPIs);
app.use('/api/post', postAPIs);

app.listen(3000, () => {
    console.log('Running...');
})
