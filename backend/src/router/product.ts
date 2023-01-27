import {Router} from "express";
import {body} from "express-validator";
import authMiddleware from "../middlewares/auth-middleware";
import productController from "../controllers/product-controller";

const router = Router();

router.get("/all", productController.getAll);
router.post("/create",
    body("name").not().isEmpty(),
    body("price").not().isEmpty(),
    body("weight").not().isEmpty(),
    body("weightUnits").not().isEmpty(),
    body("shortDescription").not().isEmpty(),
    body("longDescription").not().isEmpty(),
    body("image").not().isEmpty(),
    body("thumb").not().isEmpty(),
    body("categoryId").not().isEmpty(),
    body("location").not().isEmpty(),
    body("stock").not().isEmpty(),
    authMiddleware,
    productController.create
);


export default router;