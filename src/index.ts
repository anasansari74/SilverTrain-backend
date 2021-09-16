import { config } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { JwtPayload } from "jsonwebtoken";
import authRouter from "./resources/auth/router";
// import loginAuth from "./middlewares/loginAuth";
import usersRouter from "./resources/users/router";

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* SETUP ROUTES */

app.use("/user", usersRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
