"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./resources/auth/router"));
const loginAuth_1 = require("./middlewares/loginAuth");
const router_2 = __importDefault(require("./resources/users/router"));
const router_3 = __importDefault(require("./resources/trainRides/router"));
const router_4 = __importDefault(require("./resources/trainTickets/router"));
// import adminRouter from "./resources/admin/router";
(0, dotenv_1.config)();
const app = (0, express_1.default)();
/* SETUP MIDDLEWARE */
app.disable("x-powered-by");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL, credentials: true })); // Enables the OPTIONS request check in our API
/* SETUP ROUTES */
//AUTH
app.use(router_1.default);
app.use(loginAuth_1.loginAuth);
app.use("/user", router_2.default);
app.use("/trainRides", router_3.default);
app.use("/tickets", router_4.default);
// app.use("/admin", adminRouter);
app.get("*", (req, res) => {
    res.json({ ok: true });
});
/* START SERVER */
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
//# sourceMappingURL=index.js.map