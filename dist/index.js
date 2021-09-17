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
// import loginAuth from "./middlewares/loginAuth";
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const router_1 = __importDefault(require("./resources/auth/router"));
const router_2 = __importDefault(require("./resources/users/router"));
/* SETUP MIDDLEWARE */
app.disable("x-powered-by");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:4000", credentials: true })); // Enables the OPTIONS request check in our API
/* SETUP ROUTES */
app.use(router_1.default);
// app.use(loginAuth);
app.use("/user", router_2.default);
app.get("*", (req, res) => {
    res.json({ ok: true });
});
/* START SERVER */
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
//# sourceMappingURL=index.js.map