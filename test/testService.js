let userService = require("../service/userService");
require("../db");


async function testUser() {
    //用户添加
    // let user = {
    //     username:"smlz",
    //     password:"123",
    //     role:100
    // };
    // let result = await userService.regist(user);
    // console.log(result)

    //登录
    let user = {
        username: "smlz",
        password: "123"
    };
    user = await userService.login(user);
    console.log(user)
    //删除
    // await userService.delByUsername("uzi")

}

testUser();


