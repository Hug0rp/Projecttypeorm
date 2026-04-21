import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();
const userController = new UserController();

router.post("/", userController.create);
router.get("/", userController.list)
router.delete("/:id", userController.delete);
router.patch("/:id", userController.update);
router.get("/:id", userController.listById);
router.get("/active", userController.listActive);
router.patch("/:id/toggle", (req, res) => userController.toggleActive(req, res));

export const userRoutes = router;
