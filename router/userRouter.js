let config = require("../config");
let userService = require("../service/userService");
let express = require("express");


let router = express.Router();

/**
 * 用户注册: url : POST , http://localhost:8080/
 */
router.post("/regist", async (request, response) => {
    let result = await userService.regist(request.body);
    response.success(result)
});
/**
 * 用户删除: url : DELETE , http://localhost:8080/
 */
router.delete("/:username", async (request, response) => {
    await userService.delByUsername(request.params.username);
    response.success()
});

/**
 * 用户查找: url : GET , http://localhost:8080/
 */
router.get("/:username", async (request, response) => {
    let username = request.params.username;
    let result = await userService.findByUsername(username);
    if (result) {
        response.success(result)
    } else {
        response.fail(`用户名为${username}的用户不存在`)
    }
});

router.post("/login", async (request, response) => {

    let token = await userService.login(request.body);

    response.success(token);
});

module.exports = router;