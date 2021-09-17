"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuth = void 0;
const authGenerator_1 = require("../utils/authGenerator");
const loginAuth = (req, res, next) => {
    const token = req.cookies.token;
    let userData = null;
    if (token) {
        userData = (0, authGenerator_1.validateToken)(token);
    }
    if (userData) {
        req.currentUser = userData;
        next();
    }
    else {
        res
            .status(401)
            .json({ err: "You need to be logged in to access the data" });
    }
};
exports.loginAuth = loginAuth;
//# sourceMappingURL=login.js.map