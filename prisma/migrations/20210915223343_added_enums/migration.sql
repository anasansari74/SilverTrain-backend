-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "Class" AS ENUM ('economy', 'business');

-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('ongoing', 'cancelled');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('unRead', 'read');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "notificationStatus" "NotificationStatus" NOT NULL DEFAULT E'unRead';

-- AlterTable
ALTER TABLE "TrainRide" ADD COLUMN     "class" "Class" NOT NULL DEFAULT E'economy',
ADD COLUMN     "rideStatus" "RideStatus" NOT NULL DEFAULT E'ongoing';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'user';
