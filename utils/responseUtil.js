//请求成功后的响应
function success(response, result) {
    response.send({
        code: 1,
        msg: "操作成功",
        data: result
    })
}

//请求失败后的响应
function fail(response, err) {
    response.send({
        code: -1,
        msg: "操作失败",
        data: err.toString()
    })
}

module.exports = {
    success,
    fail
};