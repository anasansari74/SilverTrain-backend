/*
  Warnings:

  - You are about to drop the column `class` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "class",
ADD COLUMN     "rideClass" "RideClass" NOT NULL DEFAULT E'ECONOMY';
