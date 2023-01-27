export {};

const Router = require("express").Router;
const {body} = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const productController = require("../controllers/product-controller");

const router = new Router();


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


module.exports = router;