export {};

const Router = require("express").Router;
const {body} = require("express-validator");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 32}),
    body("username").not().isEmpty(),
    body("firstname").not().isEmpty(),
    body("lastname").not().isEmpty(),
    userController.registration);
router.post("/login",
    body("email").isEmail(),
    body("password").not().isEmpty(),
    userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/activate/:link", userController.activate);
router.post("/recovery/get-link", userController.sendRecoveryLink);
router.post("/recovery/:code", userController.changePassword);
router.get("/all", authMiddleware, userController.getUsers);

module.exports = router;