let Product = require("../model/product");
let config = require("../config");

/**
 * 增加
 * @param product
 * @returns {Promise<*>}
 */
async function addItem(product) {
    let result = await Product.findOne({name: product.name});
    if (result) {
        throw Error(`商品${product.name}已存在`)
    }
    result = await Product.create(product);
    return result
}

/**
 * 删除
 * @param id
 * @returns {Promise<void>}
 */
async function deleteById(id) {
    let result = await Product.findOne({_id: id});
    if (!result) {
        throw Error(`ID为${id}的商品不存在`)
    }
    result = await Product.deleteOne({_id: id});
    if (result.n !== 1) {
        throw Error(`删除ID为${id}的商品失败`)
    }

}

/**
 * 更新
 * @param id
 * @param product
 * @returns {Promise<void>}
 */
async function updateById(id, product) {
    let result = await Product.findOne({_id: id});
    if (!result) {
        throw Error(`ID为${id}的商品不存在`)
    }
    result = await Product.updateOne({_id: id}, product);
    if (result.n !== 1) {
        throw Error(`更新ID为${id}的商品失败`)
    }

}

/**
 * 查找
 * @param page
 * @returns {Promise<*>}
 */
async function findByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_SIZE;
    return await Product.find().skip(offset).limit(config.PAGE_SIZE);
}

// 根据ID查询商品
async function findById(id) {
    return await Product.findOne({_id: id});
}


module.exports = {
    addItem,
    deleteById,
    updateById,
    findByPage,
    findById
};

