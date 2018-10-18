let Category = require("../model/category");
let config = require("../config");


/**
 *  添加: url: POST localhost:8000/category/
 * @param category
 * @returns {Promise<*>}
 */
async function addItem(category) {
    let result = await Category.findOne({name: category.name});
    if (result) {
        throw Error(`商品${name}已经存在`)
    }
    result = await Category.create(category);
    return result
}

/**
 * 根据id删除   url: DELETE localhost:8000/category/:id
 * @param id
 * @returns {Promise<void>}
 */
async function deleteById(id) {

    let result = await Category.findOne({_id: id});
    if (!result) {
        throw Error(`ID为${id}的数据不存在`)
    }
    result = await Category.deleteOne({_id: id});
    if (result.n !== 1) {
        throw Error(`删除ID为${id}的数据失败`)
    }
}


//
/**
 * 根据id更新  url: PUT  localhost:8000/category/:id
 * @param id
 * @param category
 * @returns {Promise<void>}
 */
async function updateById(id, category) {
    let result = await Category.findOne({_id: id});
    if (!result) {
        throw Error(`ID为${id}的数据不存在`)
    }
    result = await Category.updateOne({_id: id}, category);
    if (result.n !== 1) {
        throw Error("更新数据失败")
    }

}

//分页查询
/**
 * 偏移量 : (page-1)*pageSize
 *当前页面显示多少条数据 : 2
 * 分页查询 url: GET localhost:8000/category?page = 2
 * @param page
 * @returns {Promise<*>}
 */
async function findByPage(page = 1) {
    //偏移量
    let offset = (page - 1) * config.PAGE_SIZE;
    //skip(offset):跳过offset个数据, limit(config.PAGE_SIZE):每页最大放置几条数据
    let result = await Category.find().skip(offset).limit(config.PAGE_SIZE);
    return result
}

module.exports = {
    addItem,
    deleteById,
    updateById,
    findByPage
}

