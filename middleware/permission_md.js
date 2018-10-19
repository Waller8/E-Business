let permissions = [{
    role: 0,    //普通用户
    urls: [
        /\/category.*/,
        /\/product.*/,
        /\/orger.*/
    ]
},
    {
        role: 100,  //管理员
        urls: [
            /.*/
        ]
    }
];

//权限校验

module.exports = (request, response, next) => {
    //获取当前url
    let reqUrl = request.url;
    //获取用户
    let user = request.user;
    //对登陆的用户进行权限校验
    if (user) {
        //标记位,标记用户是否能够访问对应的地址,默认值是不允许访问
        let isGO = false;
        loop: for (let i = 0; i < permissions.length; i++) {
            //获取permission
            let permission = permissions[i];
            //如果当前用户的角色 = 当前权限的角色
            if (user.role == permission.role) {
                //获取urls
                let urls = permission.urls;
                //遍历urls
                for (let j = 0; j < urls.length; j++) {
                    //获取url
                    let url = urls[j];
                    //比对当前遍历到的正则表达式是否匹配,当前用户要访问的url地址
                    if (url.test(reqUrl)) {
                        // 如果匹配成功,修改标志位,说明用户可以访问,此时可以跳出循环
                        isGO = true;
                        break loop;
                    }
                }
            }
        }
        if (!isGO) {
            throw Error("您没有权限访问对应的地址");
        }
    }
    //放行
    next();
}
