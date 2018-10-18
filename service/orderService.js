let Order = require("../model/order");
let config = require("../config");
let productService = require("./productService");
let Big = require("big.js");


//生成订单
async function addOrder(order) {
    //根据商品id查询商品
    let product = await productService.findById(order.productId);
    //判断商品是否存在
    if (!product) {
        throw Error(`ID为${order.productId}的商品不存在`)
    }
    // 给商品名和价格重新赋值
    order.productName = product.name;
    order.productPrice = product.price;
    // 检查库存是否足够
    if (order.count > product.stock) {
        throw Error("商品库存不足")
    }
    //计算金额
    //商品单价
    let price = product.price;
    // let total = Big(price).times(order.count);
    let total = Big(price).times(order.count)
    order.total = total
    //生成订单
    let result = await Order.create(order);

    //扣减库存
    await productService.updateById(order.productId, {stock: product.stock - order.count});

    return result
}

//分页查询订单
async function getOrderByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_SIZE;
    return await Order.find().skip(offset).limit(config.PAGE_SIZE)
}

module.exports = {
    addOrder,
    getOrderByPage
};


