"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
// const express = require("express");
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const morgan = require("morgan");
const app = (0, express_1.default)();
/* SETUP MIDDLEWARE */
app.disable("x-powered-by");
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan("dev"));
/* SETUP ROUTES */
app.get("*", (req, res) => {
    res.json({ ok: true });
});
/* START SERVER */
const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
//# sourceMappingURL=index.js.map