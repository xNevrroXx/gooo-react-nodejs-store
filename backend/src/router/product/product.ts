import {Router} from "express";
import {body} from "express-validator";
import authMiddleware from "../../middlewares/auth-middleware";
import productController from "../../controllers/product-controller";

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/",
    body("name").not().isEmpty(),
    body("price").not().isEmpty(),
    body("weight").not().isEmpty(),
    body("weightUnits").not().isEmpty(),
    body("shortDescription").not().isEmpty(),
    body("longDescription").not().isEmpty(),
    body("image").not().isEmpty(),
    body("thumb").not().isEmpty(),
    body("categoryId").not().isEmpty(),
    body("stock").not().isEmpty(),
    authMiddleware,
    productController.create
);


export default router;