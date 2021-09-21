import { Role } from ".prisma/client";
import { Request, Response } from "express";

import prisma from "../../utils/database";

// Book Ride for user ❌
export const bookTicektForUser = async (req: Request, res: Response) => {
  const { userId, class: Class, trainRideId } = req.body;

  try {
    const result = await prisma.trainTicket.create({
      data: {},
    });

    if (result) res.json(result);
    if (!result) res.json({ msg: "Booking info. invalid" });
  } catch (e) {
    console.log(e);
  }
};
