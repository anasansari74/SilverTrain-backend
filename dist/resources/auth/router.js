"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
const { loginUser, logOutUser,
// validateLoggedInToken,
 } = require("./controller");
const { createOneUser } = require("../users/controller");
authRouter.route("/login").post(loginUser);
authRouter.route("/logout").get(logOutUser);
// authRouter.route("/signup").post(createOneUser);
// authRouter.route("/validate-token").get(validateLoggedInToken);
exports.default = authRouter;
//# sourceMappingURL=router.js.map