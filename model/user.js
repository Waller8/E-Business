let mongoose = require("mongoose");

let schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "用户名不能缺少"]
    },
    password: {
        type: String,
        required: [true, "密码不能缺少"]
    },
    age: {
        type: Number,
        min: [0, "年龄不能少于0"],
        max: [100, "年龄不能高于100"]
    },
    role: {
        type: Number,
        default: 0   //0是普通用户,100是管理员
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
//与数据库联系,user是表名
module.exports = mongoose.model("user", schema)

