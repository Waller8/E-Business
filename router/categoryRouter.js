let express = require("express");
let categoryService = require("../service/categoryService");

let router = express.Router();

/**
 * 添加分类
 * url :  POST,http://localhost:8080/category
 * 请求体中传递,要添加的数据, {name:手机}
 * @returns {Promise<void>}
 */
router.post("/", async (request, response) => {
    let result = await categoryService.addItem(request.body);
    response.success(result)
});

/**
 * 根据ID删除
 * url : DELETE ,http://localhost:8080/category/001
 * @returns {Promise<void>}
 */
router.delete("/:id", async (request, response) => {
    await categoryService.deleteById(request.params.id);
    response.success()
});

/**
 * 根据ID更新
 * url : PUT , http://localhost:8080/category/:id
 * 更新的数据: {name:手机}
 * @returns {Promise<void>}
 */
router.put("/:id", async (request, response) => {
    let id = request.params.id;
    let body = request.body;
    await categoryService.updateById(id, body);
    response.success()
});


router.get("/", async (request, response) => {
    let page = request.query.page;
    let result = await categoryService.findByPage(page);
    response.success(result)
});

module.exports = router;
