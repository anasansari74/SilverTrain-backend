/*
  Warnings:

  - You are about to drop the column `trainTicketId` on the `TrainRide` table. All the data in the column will be lost.
  - You are about to drop the column `trainRideId` on the `TrainTicket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TrainRide" DROP COLUMN "trainTicketId";

-- AlterTable
ALTER TABLE "TrainTicket" DROP COLUMN "trainRideId";
