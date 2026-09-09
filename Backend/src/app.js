import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";
import ticketRouter from "./routes/ticket.route.js";
import adminRouter from "./routes/admin.route.js";
import commentRouter from "./routes/comment.route.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/ticket", ticketRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/comment", commentRouter);
// app.use("/api/v1",userRouter)
app.use(errorHandler)
export default app;