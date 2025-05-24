import { Type } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { VehicleBaseInputDto } from 'src/domain/vehicle/dtos';

export abstract class UpdateOneVehicleInputDto extends PartialType(
  VehicleBaseInputDto as Type<VehicleBaseInputDto>,
) {}
