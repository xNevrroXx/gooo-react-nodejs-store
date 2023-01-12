const Router = require("express").Router;
const userController = require("../controllers/user-controller");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);
router.post("/recovery/get-code", userController.sendRecoveryCode);
router.post("/recovery/verify-code", userController.verifyRecoveryCode);

module.exports = router;