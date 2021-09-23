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
exports.createdWithHash = exports.findUserWithValidation = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const bcrypt_1 = require("bcrypt");
const findUserWithValidation = (userCreds) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield database_1.default.user.findFirst({
        where: { userName: userCreds.userName },
    });
    console.log("Found user:", foundUser);
    if (!foundUser)
        throw Error("Username/Password Incorrect!");
    const isPasswordValid = yield (0, bcrypt_1.compare)(userCreds.password, foundUser.password);
    // if (!isPasswordValid) throw Error("Username/Password Incorrect!");
    if (!isPasswordValid)
        return console.log("is password valid", isPasswordValid);
    return foundUser;
});
exports.findUserWithValidation = findUserWithValidation;
const createdWithHash = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const plainText = newUser.password;
    const hashedPassword = yield (0, bcrypt_1.hash)(plainText, 15);
    const savedUser = database_1.default.user.create({
        data: Object.assign(Object.assign({}, newUser), { password: hashedPassword }),
    });
    return savedUser;
});
exports.createdWithHash = createdWithHash;
//# sourceMappingURL=services.js.map