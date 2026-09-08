import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { commentDelete, createComment, getAllComment } from "../controller/comment.controller.js";


const router = Router()

router.route("/createComment/:ticketId").post(verifyJWT, createComment)
router.route("/getAllComment/:ticketId").get(verifyJWT, getAllComment)
router.route("/deleteComment/:commentId").delete(verifyJWT,commentDelete)

export default router