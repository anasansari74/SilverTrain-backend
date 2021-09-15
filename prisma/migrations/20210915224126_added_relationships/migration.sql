/*
  Warnings:

  - Added the required column `trainRideId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TrainRide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "trainRideId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TrainRide" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainRide" ADD CONSTRAINT "TrainRide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_trainRideId_fkey" FOREIGN KEY ("trainRideId") REFERENCES "TrainRide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
