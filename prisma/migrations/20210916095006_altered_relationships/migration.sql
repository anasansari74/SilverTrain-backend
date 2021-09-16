/*
  Warnings:

  - A unique constraint covering the columns `[trainRideId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notification_trainRideId_unique" ON "Notification"("trainRideId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_unique" ON "UserInfo"("userId");
