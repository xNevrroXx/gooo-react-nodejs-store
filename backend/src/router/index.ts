import {Router} from "express";
import user from "./user/user";
import category from "./category/category";
import product from "./product/product";

const rootRouter = Router();

rootRouter.use("/user", user);
rootRouter.use("/category", category);
rootRouter.use("/product", product);

export default rootRouter;