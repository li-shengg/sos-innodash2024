/*
  Warnings:

  - You are about to drop the column `payment_type` on the `Cars` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('SaloonCar', 'MPV_SUV_Minivan', 'LargeVan', 'Minibus', 'Taxi_Saloon', 'Taxi_SUV');

-- AlterTable
ALTER TABLE "Cars" DROP COLUMN "payment_type";
