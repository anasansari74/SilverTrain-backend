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
exports.getRideByToAndFromLocation = exports.getAllRides = exports.getOneRide = void 0;
const database_1 = __importDefault(require("../../utils/database"));
// GET ONE TRAIN ✔
const getOneRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.trainId);
    try {
        const result = yield database_1.default.trainRide.findMany({
            where: { id },
        });
        if (result)
            res.json(result);
        if (!result)
            res.json("msg: Train Ride not found");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getOneRide = getOneRide;
// GET ALL TRAIN RIDES ✔
const getAllRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.trainRide.findMany();
        if (result)
            res.json(result);
        if (!result)
            res.json({ msg: "Rides not found" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllRides = getAllRides;
// GET ALL TRAIN RIDES FROM DEPARTURE LOCATION TO ARRIVAL LOCATION ✔
const getRideByToAndFromLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDptLct = req.params.dptLct.toString();
    const userArvLct = req.params.arvLct.toString();
    try {
        const result = yield database_1.default.trainRide.findMany({
            where: {
                departureLocation: {
                    equals: userDptLct,
                    mode: "insensitive",
                },
                arrivalLocation: {
                    equals: userArvLct,
                    mode: "insensitive",
                },
            },
        });
        if (result)
            res.json(result);
        if (!result)
            res.json({ msg: "Location not found" });
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
});
exports.getRideByToAndFromLocation = getRideByToAndFromLocation;
//# sourceMappingURL=controller.js.map