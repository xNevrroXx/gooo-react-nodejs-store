export {};

const Router = require("express").Router;
const {body} = require("express-validator");

// own modules
const categoryController = require("../controllers/category-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/all", categoryController.getAll);
router.post("/create",
    body("name").not().isEmpty(),
    body("label").not().isEmpty(),
    body("parentId").not().isEmpty(),
    authMiddleware,
    categoryController.create
);
// router.post("/delete", authMiddleware, categoryController.delete);

module.exports = router;