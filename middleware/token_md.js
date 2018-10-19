let encryptUtil = require("../utils/encryptUtil");
let config = require("../config");
let userService = require("../service/userService");

//校验登录的请求路径
function checkUrl(url) {
// 不需要登录的路径
    // 注册 : /user/regist
    // 登录 : /user/login

    let ignoreUrls = [
        /\/user\/regist/,
        /\/user\/login/
    ];
    // 标志位,当前的url是否需要进行登录状态的校验,默认值是需要
    let isNeedCheck = true;

    for (let i = 0; i < ignoreUrls.length; i++) {
        let ignoreUrl = ignoreUrls[i];
        if (ignoreUrl.test(url)) {
            isNeedCheck = false;
            break;
        }
    }
    return isNeedCheck;
}

//校验用户是否登录
module.exports = async (request, response, next) => {
    //用户的请求路径
    let url = request.url;
    //判断此路径是否需要进行登录状态校验
    if (checkUrl(url)) {

        //获取token
        let token = request.get("token");

        if (!token) {
            throw Error("请求中没有token数据")
        }

        let tokenDecrypt = null;
        //解密token
        try {

            tokenDecrypt = encryptUtil.aesDecrypt(token, config.TOKEN_KEY);
            console.log(tokenDecrypt)
        } catch (e) {
            throw Error("token解密失败,请重新登录")
        }
        //解密出来的是json字符串,不是js对象,需要把json字符串转换成js对象
        let tokenJs = JSON.parse(tokenDecrypt);
        //获取token有效期
        let expire = tokenJs.expire;
        if (Date.now() > expire) {
            throw Error("token已过期,请重新登录")
        }

        //从token中获取用户名
        let username = tokenJs.username;
        //根据用户名查询用户
        let user = await userService.findByUsername(username);

        //判断能否查到
        if (!user) {
            throw Error("token无效,请重新登录")
        }
        // 把查询到的用户存储到request对象身上
        request.user = user;
    }

    //放行代码
    next();

};

