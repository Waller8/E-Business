let express = require("express");
let orderService = require("../service/orderService");

let router = express.Router();

//生成订单
router.post("/", async (request, response) => {
    let result = await orderService.addOrder(request.body);
    response.success(result)
});

//查询订单
router.get("/", async (request, response) => {

    let page = request.query.page;
    let result = await orderService.getOrderByPage(page);
    response.success(result)
});

module.exports = router;