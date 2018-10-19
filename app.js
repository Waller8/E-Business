require('express-async-errors');
let express = require("express");
let morgan = require("morgan");
require("./db");
let config = require("./config");
let app = express();

// 使用自定义的加强response的中间件
app.use(require("./middleware/response_md"));
app.use(require("./middleware/token_md"));
app.use(require("./middleware/permission_md"));
app.use(morgan("combined"));
app.use(express.json());
app.use("/user", require("./router/userRouter"));
app.use("/category", require("./router/categoryRouter"));
app.use("/product", require("./router/productRouter"));
app.use("/order", require("./router/orderRouter"));


// 处理全局异常的中间件
app.use((err, request, response, next) => {
    // 写出失败的响应
    response.fail(err)
});

app.listen(config.PORT);