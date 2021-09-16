"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const { getUserById } = require("./controller");
userRouter.get("/:id", getUserById);
exports.default = userRouter;
//# sourceMappingURL=router.js.map