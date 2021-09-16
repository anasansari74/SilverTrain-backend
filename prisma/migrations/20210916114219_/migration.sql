/*
  Warnings:

  - The values [economy,business] on the enum `Class` will be removed. If these variants are still used in the database, this will fail.
  - The values [unRead,read] on the enum `NotificationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [ongoing,cancelled] on the enum `RideStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Class_new" AS ENUM ('ECONOMY', 'BUSINESS');
ALTER TABLE "TrainRide" ALTER COLUMN "class" DROP DEFAULT;
ALTER TABLE "TrainRide" ALTER COLUMN "class" TYPE "Class_new" USING ("class"::text::"Class_new");
ALTER TYPE "Class" RENAME TO "Class_old";
ALTER TYPE "Class_new" RENAME TO "Class";
DROP TYPE "Class_old";
ALTER TABLE "TrainRide" ALTER COLUMN "class" SET DEFAULT 'ECONOMY';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "NotificationStatus_new" AS ENUM ('UNREAD', 'READ');
ALTER TABLE "Notification" ALTER COLUMN "notificationStatus" DROP DEFAULT;
ALTER TABLE "Notification" ALTER COLUMN "notificationStatus" TYPE "NotificationStatus_new" USING ("notificationStatus"::text::"NotificationStatus_new");
ALTER TYPE "NotificationStatus" RENAME TO "NotificationStatus_old";
ALTER TYPE "NotificationStatus_new" RENAME TO "NotificationStatus";
DROP TYPE "NotificationStatus_old";
ALTER TABLE "Notification" ALTER COLUMN "notificationStatus" SET DEFAULT 'UNREAD';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "RideStatus_new" AS ENUM ('ONGOING', 'CANCELLED');
ALTER TABLE "TrainRide" ALTER COLUMN "rideStatus" DROP DEFAULT;
ALTER TABLE "TrainRide" ALTER COLUMN "rideStatus" TYPE "RideStatus_new" USING ("rideStatus"::text::"RideStatus_new");
ALTER TYPE "RideStatus" RENAME TO "RideStatus_old";
ALTER TYPE "RideStatus_new" RENAME TO "RideStatus";
DROP TYPE "RideStatus_old";
ALTER TABLE "TrainRide" ALTER COLUMN "rideStatus" SET DEFAULT 'ONGOING';
COMMIT;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "notificationStatus" SET DEFAULT E'UNREAD';

-- AlterTable
ALTER TABLE "TrainRide" ALTER COLUMN "class" SET DEFAULT E'ECONOMY',
ALTER COLUMN "rideStatus" SET DEFAULT E'ONGOING';
