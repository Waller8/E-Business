let User = require("../model/user");
let encryptUtil = require("../utils/encryptUtil");
let config = require("../config");

/**
 * 注册:  url : POST , http://localhost:8080/
 * @param user
 * @returns {Promise<void>}
 */
async function regist(user) {
    //根据用户名查询
    let result = await findByUsername(user.username);
    if (result) {
        throw Error(`用户名${user.username}已经被占用`);
    }
    //对密码进行加密操作
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    //对角色重新赋值,防止被攻击
    user.role = 0;
    //注册
    result = await User.create(user);
    //防止暴露密码,给密码赋值为空
    result.password = "";
    return result

}

/**
 *登录
 * url : POST , http://localhost:8080/
 * @param user
 * @returns {Promise<*>}
 */
async function login(user) {

    // 根据用户名检查用户是否存在
    await isExistByUsername(user.username);
    //判断密码有没有传递过来
    let password = user.password;
    if (password == null || password.trim().length == 0) {
        throw Error("密码不能为空")
    }
    //对密码加密
    user.password = encryptUtil.md5Hmac(password, user.username);
    user = await User.findOne(user);

    if (!user) {
        throw Error("用户名或密码错误");
    }

    let token = {
        username: user.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    };
    // 参数1 : 原文
    // 参数2 : 密钥
    let tokenEncrypt = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);
    return tokenEncrypt;
}


/**
 *  查找
 *  url : GET , http://localhost:8080/username
 * @param username
 * @returns {Promise<*>}
 */
async function findByUsername(username) {
    return await User.findOne({username: username});

}


/**
 * delete 删除 http://localhost:8080/username
 * @param username  用户名
 * @returns {Promise<void>}
 */
async function delByUsername(username) {
    await isExistByUsername(username);
    result = await User.deleteOne({username: username});
    if (result.n !== 1) {
        throw Error("删除失败");
    }
}


/**
 * get 查询   http://localhost:8080/username
 * @param username
 * @returns {Promise<*>}
 */
//根据用户名查询用户
async function isExistByUsername(username) {
    let result = await findByUsername(username);
    if (!result) {
        throw Error(`用户名为${username}的用户不存在`);
    }
}

module.exports = {
    regist,
    login,
    findByUsername,
    delByUsername
}

