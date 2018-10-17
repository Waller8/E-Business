let mongoose = require("mongoose");
let config = require("./config");
mongoose.connect("mongodb://localhost:27017/" + config.DB, {useNewUrlParser: true});
let db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once("open", () => {
    console.log("连接成功")
});
