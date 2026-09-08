import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { allAdmin, allTicket, assignTicket, getTicket, oneticket,  update} from "../controller/admin.controller.js"
import { getCurrentUser, logout } from "../controller/user.controller.js";


const router = Router()

router.route("/allTicket").get(verifyJWT, isAdmin, allTicket)
router.route("/oneTicket/:ticketId").get(verifyJWT, isAdmin, oneticket)
router.route("/updateStatus/:ticketId").patch(verifyJWT, isAdmin, update)
router.route("/assignTicket/:ticketId").patch(verifyJWT, isAdmin, assignTicket)
router.route("/allAdmin").get(verifyJWT,isAdmin,allAdmin)


router.route("/logout").post(verifyJWT,isAdmin,logout)
router.route("/current-user").get(verifyJWT,isAdmin,getCurrentUser)
router.route("/getTicket").get(verifyJWT,isAdmin,getTicket)

export default router