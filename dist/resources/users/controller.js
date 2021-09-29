"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUserName = exports.getUserById = exports.createOneUser = void 0;
const client_1 = require(".prisma/client");
const authGenerator_1 = require("../../utils/authGenerator");
const database_1 = __importDefault(require("../../utils/database"));
const services_1 = require("../auth/services");
// CREATE A NEW USER ✔
const createOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, firstName, lastName, dateOfBirth, password, bio } = req.body;
    const newUser = {
        userName,
        password,
        role: client_1.Role.USER,
        userInfo: {
            create: {
                firstName,
                lastName,
                dateOfBirth: new Date(dateOfBirth),
                bio,
            },
        },
    };
    try {
        const savedUser = yield (0, services_1.createdWithHash)(newUser);
        console.log("New Hash User:", savedUser);
        const token = (0, authGenerator_1.createToken)({
            id: savedUser.id,
            userName: savedUser.userName,
        });
        if (savedUser && token) {
            res.cookie("token", token, { httpOnly: true });
            res.json({
                user: {
                    id: savedUser.id,
                    userName: savedUser.userName,
                    role: client_1.Role.USER,
                },
            });
        }
        if (!savedUser && !token)
            res.json({ msg: "User and token could not be created" });
        if (!savedUser)
            res.json({ msg: "User cound not be created" });
        if (!token)
            res.json({ msg: "token could not be created" });
    }
    catch (e) {
        console.log(e);
        res.json(`ERROR: ${e}`);
    }
});
exports.createOneUser = createOneUser;
// GET ONE USER ✔
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield database_1.default.user.findUnique({
            where: { id },
            include: { userInfo: true, tickets: true },
        });
        if (result)
            res.json(result);
        if (!result)
            res.json({ msg: "User not found" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserById = getUserById;
// GET ONE USER by username ✔
const getUserByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.userName.toString();
    try {
        const result = yield database_1.default.user.findUnique({
            where: { userName },
            include: { userInfo: true, tickets: true },
        });
        if (result)
            res.json(result);
        if (!result)
            res.json({ msg: "User not found" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserByUserName = getUserByUserName;
//# sourceMappingURL=controller.js.map