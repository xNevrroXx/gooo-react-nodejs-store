import {Router} from  "express";
import {body} from  "express-validator";
import userController from "../../controllers/user-controller";
import authMiddleware from "../../middlewares/auth-middleware";

const router = Router();

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 32}),
    body("username").not().isEmpty(),
    body("firstname").not().isEmpty(),
    body("lastname").not().isEmpty(),
    body("location").not().isEmpty(),
    body("isAdmin").custom(value => {
        if(value !== 0 && value !== 1)
        {
            return Promise.reject("Поле isAdmin может содержать значение 0 или 1.");
        }

        return Promise.resolve();
    }),
    userController.registration);
router.post("/login",
    body("email").isEmail(),
    body("password").not().isEmpty(),
    userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/activate/:link", userController.activate);
router.post("/recovery/get-link",
    body("email").isEmail(),
    userController.sendRecoveryLink);
router.post("/recovery/:code", userController.changePassword);
router.get("/shopping-cart", authMiddleware, userController.getProductsFromCart);
router.post("/shopping-cart/:productId", authMiddleware, userController.addProductToCart);
router.post("/shopping-cart/change-select/:productId",
    body("isSelected").not().isEmpty().isBoolean(),
    authMiddleware,
    userController.changeSelect);
router.post("/shopping-cart/reduce-quantity/:productId", authMiddleware, userController.reduceQuantity);
router.delete("/shopping-cart/:productId", authMiddleware, userController.deleteProductFromCart);
router.get("/all", authMiddleware, userController.getUsers);

export default router;