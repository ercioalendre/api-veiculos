export abstract class VehicleEntity {
  public readonly id: string;
  public readonly licensePlate: string;
  public readonly chassi: string;
  public readonly renavam: string;
  public readonly manufacturer: string;
  public readonly model: string;
  public readonly productionYear: string;
  public readonly createdAt: Date;
  public readonly updatedAt?: Date | null;
}
