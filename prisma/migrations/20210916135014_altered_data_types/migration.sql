-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "notificationStatus" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TrainRide" ALTER COLUMN "departureTime" SET DATA TYPE TEXT,
ALTER COLUMN "arrivalTime" SET DATA TYPE TEXT;
