"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainRidesRouter = (0, express_1.Router)();
const { getAllRides, getOneRide, getRideByToAndFromLocation, } = require("./controller");
trainRidesRouter.get("/", getAllRides);
trainRidesRouter.get("/oneRide/:trainId", getOneRide);
trainRidesRouter.get("/:dptLct/:arvLct", getRideByToAndFromLocation);
exports.default = trainRidesRouter;
//# sourceMappingURL=router.js.map