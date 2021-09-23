import { Router } from "express";

const ticketsRouter = Router();

import {
  bookTicketForUser,
  getAllTicketsForUser,
  getOneTicket,
  getTicketForUserByRideId,
  deleteTicketForUser,
} from "./controller";

ticketsRouter.get("/:id", getOneTicket);

ticketsRouter.post("/bookTicket", bookTicketForUser);

ticketsRouter.get("/userTicket/:userId/:trainRideId", getTicketForUserByRideId);

ticketsRouter.get("/allTickets/:userId", getAllTicketsForUser);

ticketsRouter.delete("/:userId/:rideId", deleteTicketForUser);

export default ticketsRouter;
