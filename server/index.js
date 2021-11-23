// app
const express = require('express')
const bodyParser = require('body-parser')
var database = require("./config/database");
var auth = require("./auth/main_auth")
const cors = require('cors')

var balanceRouter = require('./routes/Balance.router');
var userRouter = require('./routes/User.router');

const app = express()
const port = 3001
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

// DB connection 
database.mongoConnect();

//Routes

app.use('/user', userRouter);
app.use(auth)
app.use('/balance', balanceRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))