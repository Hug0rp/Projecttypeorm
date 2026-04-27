import { Router } from "express";
import { PostController } from "../controller/postController";

const router = Router();
const postController = new PostController();

router.get("/", postController.list);
router.post("/", postController.create);

export const postRoutes = router;