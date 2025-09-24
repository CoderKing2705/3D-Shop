/*
  Warnings:

  - Added the required column `modelPath` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "modelPath" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;
