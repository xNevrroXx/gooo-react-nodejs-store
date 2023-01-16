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
router.get("/users", authMiddleware, userController.getUsers);
router.get("/activate/:link", userController.activate);
router.post("/recovery/get-code", userController.sendRecoveryCode);
router.post("/recovery/verify-code", userController.verifyRecoveryCode);
router.post("/recovery/create-new-password", userController.recoveryCreateNewPassword);

module.exports = router;