"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketsRouter = (0, express_1.Router)();
const controller_1 = require("./controller");
ticketsRouter.get("/:id", controller_1.getOneTicket);
ticketsRouter.post("/bookTicket", controller_1.bookTicketForUser);
ticketsRouter.get("/userTicket/:userId/:trainRideId", controller_1.getTicketForUserByRideId);
ticketsRouter.get("/allTickets/:userId", controller_1.getAllTicketsForUser);
ticketsRouter.delete("/:userId/:rideId", controller_1.deleteTicketForUser);
exports.default = ticketsRouter;
//# sourceMappingURL=router.js.map