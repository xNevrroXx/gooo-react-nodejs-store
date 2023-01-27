const Router = require("express").Router;
const user = require("./user");
const category = require("./category");
const product = require("./product");

const rootRouter = new Router();

rootRouter.use("/user", user);
rootRouter.use("/category", category);
rootRouter.use("/product", product);

module.exports = rootRouter;