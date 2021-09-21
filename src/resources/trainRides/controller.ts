import { Request, Response } from "express";

import prisma from "../../utils/database";

// GET ONE TRAIN ✔

export const getOneRide = async (req: Request, res: Response) => {
  const id = parseInt(req.params.trainId);

  try {
    const result = await prisma.trainRide.findMany({
      where: { id },
    });

    if (result) res.json(result);
    if (!result) res.json("msg: Train Ride not found");
  } catch (error) {
    console.log(error);
  }
};

// GET ALL TRAIN RIDES ✔
export const getAllRides = async (req: Request, res: Response) => {
  try {
    const result = await prisma.trainRide.findMany();

    if (result) res.json(result);
    if (!result) res.json({ msg: "Rides not found" });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL TRAIN RIDES FROM DEPARTURE LOCATION TO ARRIVAL LOCATION ✔
export const getRideByToAndFromLocation = async (
  req: Request,
  res: Response
) => {
  const userDptLct = req.params.dptLct.toString();
  const userArvLct = req.params.arvLct.toString();

  try {
    const result = await prisma.trainRide.findMany({
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

    if (result) res.json(result);
    if (!result) res.json({ msg: "Location not found" });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
