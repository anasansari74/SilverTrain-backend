"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicketForUser = exports.getAllTicketsForUser = exports.getTicketForUserByRideId = exports.bookTicketForUser = exports.getOneTicket = void 0;
const database_1 = __importDefault(require("../../utils/database"));
//Get Ticket by id
const getOneTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield database_1.default.ticket.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                trainRides: true,
            },
        });
        if (result)
            res.json(result);
        if (!result)
            res.json({ msg: "Ticket not found!" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOneTicket = getOneTicket;
// Book Ticket for user ✔
const bookTicketForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingInfo = Object.assign({}, req.body);
    const newTicket = {
        userId: bookingInfo.userId,
        trainRideId: bookingInfo.trainRideId,
        rideClass: bookingInfo.rideClass,
    };
    try {
        const result = yield database_1.default.ticket.create({
            data: Object.assign({}, newTicket),
        });
        const updatedUser = yield database_1.default.user.update({
            where: {
                id: newTicket.userId,
            },
            data: {
                tickets: {
                    connect: {
                        id: result.id,
                    },
                },
            },
        });
        const updatedRide = yield database_1.default.trainRide.update({
            where: {
                id: newTicket.trainRideId,
            },
            data: {
                tickets: {
                    connect: {
                        id: result.id,
                    },
                },
            },
        });
        if (result)
            res.json(result);
        if (!result)
            res.json({ msg: "Booking info. invalid" });
    }
    catch (e) {
        console.log(e);
    }
});
exports.bookTicketForUser = bookTicketForUser;
//Get ticket by userId for a trainRide
const getTicketForUserByRideId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const trainRideId = parseInt(req.params.trainRideId);
    try {
        const result = yield database_1.default.ticket.findFirst({
            where: {
                AND: [
                    { userId: { equals: userId } },
                    { trainRideId: { equals: trainRideId } },
                ],
            },
            include: {
                trainRides: true,
            },
        });
        if (result)
            res.json(result);
        if (!result)
            res.json({ msg: "Ticket not found!" });
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
});
exports.getTicketForUserByRideId = getTicketForUserByRideId;
//Get all tickets for a user
const getAllTicketsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.userId);
    try {
        const result = yield database_1.default.ticket.findMany({
            where: {
                userId: id,
            },
            include: {
                trainRides: true,
            },
        });
        if (result)
            res.json(result);
        if (!result)
            res.json({ msg: "No User Found" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllTicketsForUser = getAllTicketsForUser;
const deleteTicketForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const rideId = parseInt(req.params.rideId);
    console.log("Running...");
    try {
        const ticketToDelete = yield database_1.default.ticket.findFirst({
            where: {
                userId: userId,
                trainRideId: rideId,
            },
            // AND: [
            // { userId: { equals: userId } },
            // { trainRideId: { equals: rideId } },
            // ],
        });
        console.log(ticketToDelete);
        if (ticketToDelete) {
            const result = yield database_1.default.ticket.delete({
                where: {
                    id: ticketToDelete.id,
                },
                // include: {
                //   userId: true,
                //   trainRideId: true,
                // },
            });
            if (result)
                res.json(result);
            if (!result)
                res.json({ msg: "No Ticket Found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
});
exports.deleteTicketForUser = deleteTicketForUser;
//# sourceMappingURL=controller.js.map