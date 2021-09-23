/*
  Warnings:

  - The `class` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RideClass" AS ENUM ('ECONOMY', 'BUSINESS');

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "class",
ADD COLUMN     "class" "RideClass" NOT NULL DEFAULT E'ECONOMY';

-- DropEnum
DROP TYPE "Class";
