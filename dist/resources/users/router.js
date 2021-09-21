"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const { getUserById, bookRideForUser } = require("./controller");
userRouter.get("/:id", getUserById);
userRouter.patch("/trainRide/:trainRideId/:id", bookRideForUser);
exports.default = userRouter;
//# sourceMappingURL=router.js.map