import { config } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRouter from "./resources/auth/router";
import { loginAuth } from "./middlewares/loginAuth";
import usersRouter from "./resources/users/router";
import trainRidesRouter from "./resources/trainRides/router";
import ticketsRouter from "./resources/trainTickets/router";
// import adminRouter from "./resources/admin/router";

config();

const app = express();

declare global {
  namespace Express {
    interface Request {
      currentUser: string | JwtPayload;
    }
  }
}

/* SETUP MIDDLEWARE */

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
); // Enables the OPTIONS request check in our API

/* SETUP ROUTES */

//AUTH

app.use(authRouter);
// app.use(loginAuth);

app.use("/user", usersRouter);
app.use("/trainRides", trainRidesRouter);
app.use("/tickets", ticketsRouter);
// app.use("/admin", adminRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
