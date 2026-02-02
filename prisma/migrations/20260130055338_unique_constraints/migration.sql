/*
  Warnings:

  - A unique constraint covering the columns `[shopName]` on the table `ProviderProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProviderProfile_shopName_key" ON "ProviderProfile"("shopName");
