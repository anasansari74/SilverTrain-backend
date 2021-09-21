import { Request, Response } from "express";

import prisma from "../../utils/database";

// CANCEL A TRAIN RIDE
//which is supposed to be:
// 1) a patch request to change enum RideStatus to CANCELLED
// 2) a post request to add a notification to a train ride
