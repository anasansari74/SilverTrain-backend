"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const { getUserById, getUserByUserName } = require("./controller");
userRouter.get("/:id", getUserById);
userRouter.get("/username/:userName", getUserByUserName);
exports.default = userRouter;
//# sourceMappingURL=router.js.map