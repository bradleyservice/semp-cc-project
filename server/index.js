require('dotenv').config();
const express = require('express');
// const session = require('express-session');

const {SERVER_PORT} = process.env;
const ctrl = require('./controller');

const app = express();

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`server is on port ${SERVER_PORT}`))