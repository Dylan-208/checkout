/*
  Warnings:

  - Added the required column `height` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."product" ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "length" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL;
