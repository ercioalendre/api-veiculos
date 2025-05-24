-- CreateTable
CREATE TABLE "Vehicle" (
    "id" UUID NOT NULL,
    "licensePlate" VARCHAR(10) NOT NULL,
    "chassi" VARCHAR(17) NOT NULL,
    "renavam" VARCHAR(11) NOT NULL,
    "manufacturer" VARCHAR NOT NULL,
    "model" VARCHAR NOT NULL,
    "productionYear" CHAR(4) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_licensePlate_key" ON "Vehicle"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_chassi_key" ON "Vehicle"("chassi");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_renavam_key" ON "Vehicle"("renavam");
