require('express-async-errors');
let express = require("express");
let mongoose = require("mongoose");
let morgan = require("morgan");
require("./db");
let config = require("./config");

let app = express();

app.use(morgan("combined"));
app.use(express.json());


app.listen(config.PORT);