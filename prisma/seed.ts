import { Role } from "@prisma/client";
import prisma from "../src/utils/database";

const users = [
  {
    username: "Doe",
    password: "user1",
    role: Role.USER,
  },
  {
    username: "Snow",
    password: "admin1",
    role: Role.ADMIN,
  },
];

const userInfo = [
  {
    firstName: "John",
    lastName: "Doe",
    bio: "I like coding",
    DateOfBirth: new Date(1993, 12, 16),
    userId: 1,
  },
  {
    firstName: "John",
    lastName: "Snow",
    bio: "I invented coding",
    DateOfBirth: new Date(1990, 8, 1),
    userId: 2,
  },
];

const trainRides = [
  {
    departureLocation: "London",
    departureTime: "14:05",
    arrivalLocation: "Manchester",
    arrivalTime: "17:06",
    date: new Date(2021, 10, 3),
    price: 100.5,
  },
  {
    departureLocation: "London",
    departureTime: "12:05",
    arrivalLocation: "Manchester",
    arrivalTime: "15:06",
    date: new Date(2021, 10, 7),
    price: 110,
  },
  {
    departureLocation: "London",
    departureTime: "10:05",
    arrivalLocation: "Manchester",
    arrivalTime: "13:06",
    date: new Date(2021, 10, 12),
    price: 115.75,
  },
  {
    departureLocation: "London",
    departureTime: "11:05",
    arrivalLocation: "Manchester",
    arrivalTime: "14:06",
    date: new Date(2021, 10, 15),
    price: 105.75,
  },
  {
    departureLocation: "London",
    departureTime: "18:05",
    arrivalLocation: "Manchester",
    arrivalTime: "21:06",
    date: new Date(2021, 10, 16),
    price: 105.75,
  },
  {
    departureLocation: "London",
    departureTime: "16:05",
    arrivalLocation: "Manchester",
    arrivalTime: "19:06",
    date: new Date(2021, 10, 19),
    price: 105,
  },
  {
    departureLocation: "London",
    departureTime: "16:05",
    arrivalLocation: "Manchester",
    arrivalTime: "19:06",
    date: new Date(2021, 10, 21),
    price: 124.5,
  },
  {
    departureLocation: "London",
    departureTime: "15:05",
    arrivalLocation: "Manchester",
    arrivalTime: "18:06",
    date: new Date(2021, 10, 25),
    price: 120.5,
  },
  {
    departureLocation: "London",
    departureTime: "14:05",
    arrivalLocation: "Manchester",
    arrivalTime: "17:06",
    date: new Date(2021, 10, 28),
    price: 117.5,
  },
  {
    departureLocation: "London",
    departureTime: "14:05",
    arrivalLocation: "Manchester",
    arrivalTime: "17:06",
    date: new Date(2021, 11, 5),
    price: 117.5,
  },
];

const notifications = [
  {
    message: "Engineering work",
  },
  {
    message: "Adverse Weather",
  },
  {
    message: "On-board Medical Emergency",
  },
  {
    message: "Track Obstruction",
  },
  {
    message: "Vandalism",
  },
];

async function seed() {
  //The order they are "matters"

  //Users
  for (const user of users) {
    const newUser = await prisma.user.create({
      data: user,
    });
    console.log({ newUser });
  }

  //UserInfo
  for (const info of userInfo) {
    const newUserInfo = await prisma.userInfo.create({
      data: info,
    });
    console.log({ newUserInfo });
  }

  //TrainRides
  for (const trainRide of trainRides) {
    const newTrainRide = await prisma.trainRide.create({
      data: trainRide,
    });
    console.log({ newTrainRide });
  }

  //Notifications
  for (const notification of notifications) {
    const newNotification = await prisma.notification.create({
      data: notification,
    });
    console.log({ newNotification });
  }
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//npx prisma studio
