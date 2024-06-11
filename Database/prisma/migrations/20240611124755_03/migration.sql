/*
  Warnings:

  - You are about to drop the `Cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cars";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "address" STRING NOT NULL,
    "paid" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_address_key" ON "Users"("address");
