import { Router } from "express";

const trainRidesRouter = Router();

const {
  getAllRides,
  getOneRide,
  getRideByToAndFromLocation,
} = require("./controller");

trainRidesRouter.get("/", getAllRides);

trainRidesRouter.get("/oneRide/:trainId", getOneRide);

trainRidesRouter.get("/:dptLct/:arvLct", getRideByToAndFromLocation);

export default trainRidesRouter;
