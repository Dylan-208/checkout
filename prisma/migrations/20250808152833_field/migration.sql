/*
  Warnings:

  - Added the required column `cep` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "cep" TEXT NOT NULL;
