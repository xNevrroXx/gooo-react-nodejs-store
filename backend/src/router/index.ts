import {Router} from "express";
import user from "./user";
import category from "./category";
import product from "./product";

const rootRouter = Router();

rootRouter.use("/user", user);
rootRouter.use("/category", category);
rootRouter.use("/product", product);

export default rootRouter;