//商品分类模块
let mongoose = require("mongoose");
let schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "分类名称不能少"],
        unique: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("category", schema);