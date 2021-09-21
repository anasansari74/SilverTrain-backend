import { Router } from "express";

const ticketRouter = Router();

const { bookTicektForUser } = require("./controller");

export default ticketRouter;
