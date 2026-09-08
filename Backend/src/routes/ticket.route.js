import { Router } from "express";
import { createTicket, deleteTicket, getAllTicket, getOneTicket, getTicket, updateTicket } from "../controller/ticket.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/createTicket").post(verifyJWT, createTicket)
router.route("/getAllTicket").get(verifyJWT, getAllTicket)
router.route("/getTicket").get(verifyJWT, getTicket)
router.route("/update/:ticketId").patch(verifyJWT, updateTicket)
router.route("/delete/:ticketId").delete(verifyJWT, deleteTicket)
router.route("/getOneTicket/:ticketId").get(verifyJWT, getOneTicket)

export default router