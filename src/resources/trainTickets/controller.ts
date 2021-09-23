import { Request, Response } from "express";

import prisma from "../../utils/database";

//Get Ticket by id

export const getOneTicket = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const result = await prisma.ticket.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        trainRides: true,
      },
    });

    if (result) res.json(result);
    if (!result) res.json({ msg: "Ticket not found!" });
  } catch (error) {
    console.log(error);
  }
};

// Book Ticket for user ✔
export const bookTicketForUser = async (req: Request, res: Response) => {
  const bookingInfo = { ...req.body };

  const newTicket = {
    userId: bookingInfo.userId,
    trainRideId: bookingInfo.trainRideId,
    rideClass: bookingInfo.rideClass,
  };

  try {
    const result = await prisma.ticket.create({
      data: {
        ...newTicket,
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: newTicket.userId,
      },
      data: {
        tickets: {
          connect: {
            id: result.id,
          },
        },
      },
    });

    const updatedRide = await prisma.trainRide.update({
      where: {
        id: newTicket.trainRideId,
      },
      data: {
        tickets: {
          connect: {
            id: result.id,
          },
        },
      },
    });

    if (result) res.json(result);
    if (!result) res.json({ msg: "Booking info. invalid" });
  } catch (e) {
    console.log(e);
  }
};

//Get ticket by userId for a trainRide
export const getTicketForUserByRideId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const trainRideId = parseInt(req.params.trainRideId);

  try {
    const result = await prisma.ticket.findFirst({
      where: {
        AND: [
          { userId: { equals: userId } },
          { trainRideId: { equals: trainRideId } },
        ],
      },
      include: {
        trainRides: true,
      },
    });

    if (result) res.json(result);
    if (!result) res.json({ msg: "Ticket not found!" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

//Get all tickets for a user
export const getAllTicketsForUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.userId);

  try {
    const result = await prisma.ticket.findMany({
      where: {
        userId: id,
      },
      include: {
        trainRides: true,
      },
    });
    if (result) res.json(result);
    if (!result) res.json({ msg: "No User Found" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTicketForUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const rideId = parseInt(req.params.rideId);

  console.log("Running...");

  try {
    const ticketToDelete = await prisma.ticket.findFirst({
      where: {
        userId: userId,
        trainRideId: rideId,
      },
      // AND: [
      // { userId: { equals: userId } },
      // { trainRideId: { equals: rideId } },
      // ],
    });

    console.log(ticketToDelete);

    if (ticketToDelete) {
      const result = await prisma.ticket.delete({
        where: {
          id: ticketToDelete.id,
        },
        // include: {
        //   userId: true,
        //   trainRideId: true,
        // },
      });

      if (result) res.json(result);
      if (!result) res.json({ msg: "No Ticket Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};
