import { randomUUID } from 'node:crypto';
import { VehicleEntity } from 'src/shared/entities';
import { generateFakeChassi, generateFakeLicensePlate } from 'test/mocks';
import { generateFakeRenavam } from './generate-fake-renavam';

export function generateFakeVehicle(
  vehicle?: Partial<VehicleEntity>,
): VehicleEntity {
  return {
    id: randomUUID(),
    licensePlate: generateFakeLicensePlate(),
    chassi: generateFakeChassi(),
    renavam: generateFakeRenavam(),
    manufacturer: 'Toyota',
    model: 'Corolla',
    productionYear: '2025',
    createdAt: new Date(),
    ...vehicle,
  };
}
