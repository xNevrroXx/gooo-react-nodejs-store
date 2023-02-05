import {Router} from "express";
import {body} from "express-validator";

// own modules
import categoryController from "../../controllers/category-controller";
import authMiddleware from "../../middlewares/auth-middleware";

const router = Router();

router.get("/", categoryController.getAll);
router.post("/",
    body("name").not().isEmpty(),
    body("label").not().isEmpty(),
    body("parentId").not().isEmpty(),
    authMiddleware,
    categoryController.create
);

export default router;